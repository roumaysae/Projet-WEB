var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
express().use(bodyParser.json);
express().use(express.json);

router.get("/", async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      skip: req.params.skip,
      take: req.params.take,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}); //get all  (nbr of element )& skip (take offset à partir de laquelle on extrait les données de la base)

router.get("/:id(\\d+)", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: +req.params.id },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); //get user by id identif

router.post("/", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); //add user avec un nouveau id auto-increament

router.delete("/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: { id: +req.params.id },
    });
    res.status(200).json(user); //delete user avec l id donne
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: +req.params.id,
      },
      data: {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
      },
    });
    res.json(user); //update user avec le nouveau id
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
