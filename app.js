var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const categoriesRouter = require("./routes/categories");
const articlesRouter = require("./routes/articles");
const commentairesRouter = require("./routes/Commentaires");
var userArtrouter = require("./routes/userArt");
const session = require("express-session");
const passport = require("./Config/passport");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//request from/to the same endpoint is causing me a CORS error
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

///

const prisma = new PrismaClient();

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    // Configure the session store based on your requirements
    // For example, you can use the default in-memory store for development
    // and a persistent store like Redis or MongoDB for production.
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// view engine setup
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/articles", articlesRouter);
app.use("/Commentaires", commentairesRouter);
app.use("/", indexRouter);
app.use("/userArt", userArtrouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Set the view engine
app.set("view engine", "ejs");

// Configure the views directory (optional)
app.set("views", path.join(__dirname, "views"));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

// app.listen(3000, (_) => console.log("server started !!!"));

module.exports = app;
