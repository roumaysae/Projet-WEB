var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
express().use(bodyParser.json);
express().use(express.json);

router.get("/", async (req, res) => {
  try {
    const article = await prisma.Article.findMany({
      skip: req.params.skip,
      take: req.params.take,
    });
    res.json(article);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}); //get all ARTICLES (nbr of element )& skip (take offset à partir de laquelle on extrait les données de la base)

router.get("/:id(\\d+)", async (req, res) => {
  try {
    const article = await prisma.Article.findUnique({
      where: { id: +req.params.id },
    });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); //get ARTICLE by id identif

router.post("/", async (req, res) => {
  try {
    const article = await prisma.article.create({
      data: {
        titre: req.body.titre,
        contenue: req.body.contenue,
        image: req.body.image,
        published: req.body.published,
        user: {
          connect: {
            id: req.body.userId,
          },
        },
      },
    });
    res.status(200).send(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add ARTICLE avec un nouveau id auto-increament

router.delete("/:id", async (req, res) => {
  try {
    const article = await prisma.Article.delete({
      where: { id: +req.params.id },
    });
    res.status(200).json(article); //delete ARTICLE avec l id donne
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  //   try {
  //     const article = await prisma.article.update({
  //       where: {
  //         id: req.params.id,
  //       },
  //       data: {
  //         titre: req.body.titre,
  //         contenue: req.body.contenue,
  //         image: req.body.image,
  //         published: req.body.published,
  //         updatedAt: new Date(),
  //       },
  //     });
  //     res.status(200).send(article); // Update ARTICLE with the new data
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  const article = await prisma.article.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      titre: req.body.titre,
      contenue: req.body.contenue,
      image: req.body.image,
      published: req.body.published,
      updatedAt: new Date(),
    },
  });
  res.status(200).send(article); //
});

module.exports = router;
