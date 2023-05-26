const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Le champ du formulaire correspondant à l'adresse e-mail
      passwordField: "password", // Le champ du formulaire correspondant au mot de passe
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
          return done(null, false, { message: "Adresse e-mail incorrecte." });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Mot de passe incorrect." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
