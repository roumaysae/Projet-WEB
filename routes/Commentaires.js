var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();

express().use(bodyParser.json);
express().use(express.json);

router.get("/", async (req, res) => {
  try {
    const commentaire = await prisma.Commentaire.findMany({
      skip: req.params.skip,
      take: req.params.take,
    });
    res.json(commentaire);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}); //get all users (nbr of element )& skip (take offset à partir de laquelle on extrait les données de la base)

router.get("/:id(\\d+)", async (req, res) => {
  try {
    const commentaire = await prisma.Commentaire.findUnique({
      where: { id: +req.params.id },
    });
    res.json(commentaire);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); //get user by id identif

router.post("/", async (req, res) => {
  try {
    const commentaire = await prisma.Commentaire.create({
      data: {
        email: req.body.email,
        contenu: req.body.contenu,
        article: {
          connect: { id: +req.body.articleId }, // Assurez-vous que req.body.articleId contient l'identifiant de l'article auquel le commentaire est associé
        },
      },
    });
    res.status(200).send(commentaire);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}); //add user avec un nouveau id auto-increament
//add the commentaire in the body
router.delete("/:id", async (req, res) => {
  try {
    const commentaire = await prisma.Commentaire.delete({
      where: { id: +req.params.id },
    });
    res.status(200).json(commentaire); //delete user avec l id donne
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const commentaire = await prisma.Commentaire.update({
      where: {
        id: +req.params.id,
      },
      data: {
        email: req.body.email,
        contenu: req.body.contenu,
      },
    });
    res.json(commentaire); //update user avec le nouveau id
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
