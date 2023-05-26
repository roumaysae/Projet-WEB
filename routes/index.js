var express = require("express");
var router = express.Router();
const path = require("path");
/* GET home page. */
router.get("/", function (req, res, next) {
  const parentDir = path.resolve(__dirname, "..");
  res.sendFile(path.join(parentDir, "public", "index.html"));
});

module.exports = router;
