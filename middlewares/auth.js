const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(498).json({
      error: "Token not found",
    });
    return;
  }

  try {
    var user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (err) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  next();
}

module.exports = authMiddleware;
