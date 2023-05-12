const { route } = require("./users");

const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
  const take = parseInt(req.query.take) || 10; //valeur 10 par defaut
  const skip = parseInt(req.query.skip) || 0; //valeur 0 par defaut
  res.send(`Recuperation de ${take} elements de la position ${skip}`);
});

router.get("/articles:id", (req, res) => {
  const articleId = req.params.id;
  res.send(`Récupérer l'article avec l'id ${articleId}`);
});

router.post("/articles", (req, res) => {
  const Newarticle = req.body;
  res.send("ajoutez un nouveau article :");
});

router.patch("/articles", (req, res) => {
  const updateerticle = req.body;
  res.send("article is updated ");
});

router.delete("/articles:id", (req, res) => {
  const articleId = req.params.id;
  res.send(`Article with id ${articleId} is deleted`);
});

module.exports = router;
