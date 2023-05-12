const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  const take = parseInt(req.query.take);
  const skip = parseInt(req.query.skip);
  res.send(`Recuperation de ${take} elements de la position ${skip}`);
});

router.get("/categories:id", (req, res) => {
  const categorieid = req.params.id;
  res.send(`Récupérer categorie avec l'id ${categorieid}`);
});

router.post("/categories", (req, res) => {
  const Newcategorie = req.body;
  res.send("ajoutez un nouveau categorie :");
});

router.patch("/categories", (req, res) => {
  const updateCategorie = req.body;
  res.send("categorie is updated ");
});

router.delete("/categories:id", (req, res) => {
  const categorieid = req.params.id;
  res.send(`categorie with id ${categorieid} is deleted`);
});

module.exports = router;
