var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();

express().use(bodyParser.json);
express().use(express.json);

router.get("/", async (req, res) => {
  try {
    const Categorie = await prisma.Categorie.findMany({
      skip: req.params.skip,
      take: req.params.take,
    });
    res.json(Categorie);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}); //get all users (nbr of element )& skip (take offset à partir de laquelle on extrait les données de la base)

router.get("/:id(\\d+)", async (req, res) => {
  try {
    const Categorie = await prisma.Categorie.findUnique({
      where: { id: +req.params.id },
    });
    res.json(Categorie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); //get user by id identif

router.post("/", async (req, res) => {
  try {
    const categorie = await prisma.Categorie.create({
      data: {
        nom: req.body.nom,
      },
    });
    res.status(200).send(categorie);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}); //add user avec un nouveau id auto-increament

router.delete("/:id", async (req, res) => {
  try {
    const categorie = await prisma.Categorie.delete({
      where: { id: +req.params.id },
    });
    res.status(200).json(categorie); //delete user avec l id donne
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const categorie = await prisma.Categorie.update({
      where: {
        id: +req.params.id,
      },
      data: {
        nom: req.body.nom,
      },
    });
    res.json(categorie); //update user avec le nouveau id
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
