const { Router } = require("express");

const express = require("express");
const router = express.Router();

router.get("/commentaires", (req, res) => {
  const take = parseInt(req.query.take);
  const skip = parseInt(req.query.skip);
  res.send(`Recuperation de ${take} elements de la position ${skip}`);
});

router.get("/commentaires:id", (req, res) => {
  const commentaireid = req.params.id;
  res.send(`Récupérer commentaire avec l'id ${commentaireid}`);
});

router.post("/commentaires", (req, res) => {
  const Newcommentaire = req.body;
  res.send("ajoutez un nouveau commentaire :");
});

router.patch("/commentaires", (req, res) => {
  const updatecommentaire = req.body;
  res.send("commentaire is updated ");
});

router.delete("/commentaires:id", (req, res) => {
  const commentaireid = req.params.id;
  res.send(`commentaire with id ${commentaireid} is deleted`);
});

module.exports = router;
