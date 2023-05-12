var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/users", (req, res) => {
  const take = parseInt(req.query.take);
  const skip = parseInt(req.query.skip);
  res.send(`Recuperation de ${take} elements de la position ${skip}`);
});

router.get("/users:id", (req, res) => {
  const userid = req.params.id;
  res.send(`Récupérer commentaire avec l'id ${userid}`);
});

router.post("/users", (req, res) => {
  const Newuser = req.body;
  res.send("ajoutez un nouveau user :");
});

router.patch("/users", (req, res) => {
  const updatedUser = req.body;
  res.send("user is updated ");
});

router.delete("/users:id", (req, res) => {
  const userid = req.params.id;
  res.send(`user with id ${userid} is deleted`);
});

module.exports = router;
