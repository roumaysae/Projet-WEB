var jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware to protect routes that require authentication
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    // User is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to login or show an error
    res.redirect("/login");
  }
};

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && user.password === password) {
      delete user.password;
      var token = jwt.sign(user, process.env.JWT_SECRET); //verifier le token sil est le meme token
      res.json({
        user,
        token,
      });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}); //authentification for user login

// Route de signup
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { email, name, password } = req.body;
  if (email == "" || password == "" || name == "") {
    res.status(400).send("Please fill all the fields");
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ name: name }, { email: email }],
      },
    });
    if (existingUser && existingUser.email === email) {
      const token = jwt.sign(
        { id: existingUser.id, name: existingUser.name },
        process.env.JWT_SECRET
      );
      res.json({
        token,
        message: "User already exists",
      });
    } else {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,
          role: "AUTHOR",
        },
      });
      const token = jwt.sign(
        { id: newUser.id, name: newUser.name, email: newUser.email },
        process.env.JWT_SECRET
      );
      res.json({
        token,
        message: "Your signup is successful",
        newUser,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Route pour afficher la page d'accueil de l'utilisateur
router.get("/userArt", requireAuth, async (req, res) => {
  try {
    const user = req.session.user;
    const articles = await prisma.article.findMany({
      where: {
        userId: user.id,
      },
    });
    const comments = await prisma.commentaire.findMany({
      where: {
        articleId: { in: articles.map((article) => article.id) },
      },
    });

    res.render("userArt", { user, articles, comments });
  } catch (error) {
    next(error);
  }
});

// router.get("/userArt", (req, res) => {
//   const articles = []; // Récupérez les articles de l'utilisateur depuis la base de données
//   const user = req.session.user; // Récupérez les informations de l'utilisateur depuis la session

//   res.render("userArt", { user, articles });
// });

// Route pour la déconnexion de l'utilisateur
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error logging out:", err);
    }
    res.redirect("/login");
  });
});

// // Route pour afficher la page d'inscription
// router.get("/signup", (req, res) => {
//   res.render("hello");
// });

//pour la page sign up :

// router.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.log("Error logging out:", err);
//     }
//     res.redirect("/login");
//   });
// });

module.exports = router;

// **********************************************************************************an other version ********************************************************
