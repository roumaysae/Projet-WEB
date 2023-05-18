const { faker } = require("@faker-js/faker/locale/en");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function seed() {
  try {
    // Delete existing data
    await prisma.commentaire.deleteMany();
    await prisma.article.deleteMany();
    await prisma.categorie.deleteMany();
    await prisma.user.deleteMany();

    //10 users ayant le role AUTHOR:
    const users = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const user = await prisma.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: "AUTHOR",
          },
        });
        return user;
      })
    );

    // 1 utilisateur ayant le rôle ADMIN:
    const admin = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "ADMIN",
      },
    });

    //10 ctagories
    const categories = [];
    for (let i = 0; i < 10; i++) {
      const categorie = await prisma.categorie.create({
        data: {
          nom: faker.person.fullName(),
        },
      });
      categories.push(categorie);
    }

    // 100 articles appartenant à (de 1 à 4 catégories aléatoires) et écrit par l’un des 10 utilisateurs (AUTHOR)
    for (let i = 0; i < 100; i++) {
      const categorieT = new Array(Math.floor(Math.random() * 5) + 1);
      for (let j = 0; j < categorieT.length; j++) {
        categorieT[j] = {
          id: faker.helpers.arrayElement(categories).id,
        };
      }
      const randomUser = faker.helpers.arrayElement(users);

      const article = await prisma.article.create({
        data: {
          id: i + 1,
          titre: faker.lorem.word(),
          contenue: faker.lorem.paragraph(2),
          image: faker.image.url(),
          published: faker.datatype.boolean(),
          userId: randomUser.id,
          Categorie: {
            connect: categorieT,
          },
        },
      });
      //creation de 0 à 20 commentaires pour chaque article :
      for (let j = 0; j < faker.number.int({ min: 5, max: 20 }); j++) {
        await prisma.commentaire.create({
          data: {
            email: faker.internet.email(),
            contenu: faker.lorem.paragraph(2),
            articleId: article.id,
          },
        });
      }
    }

    console.log("Data seeding.... completed !!!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
seed();
