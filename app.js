require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const i18n = require("i18n");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const minify = require("express-minify");

const indexRouter = require("./routes/index");
const languagesRouter = require("./routes/languages");
const aboutRouter = require("./routes/about");
const productsRouter = require("./routes/products");
const careersRouter = require("./routes/careers");

const contactsRouter = require("./routes/contacts");
const robotsRouter = require("./routes/robots");
const sitemapRouter = require("./routes/sitemap");

const app = express();

i18n.configure({
  locales: ["en", "ru", "fr"],
  defaultLocale: "en",
  directory: __dirname + "/locales",
  cookie: "i18n",
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());
app.use(compression());
app.use(minify());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("i18n"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "i18n",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(i18n.init);
app.use(fileUpload());

app.use("/", indexRouter);
app.use("/localize", languagesRouter);
app.use("/about", aboutRouter);
app.use("/products", productsRouter);
app.use("/careers", careersRouter);
app.use("/contacts", contactsRouter);
app.use("/robots.txt", robotsRouter);
app.use("/sitemap.xml", sitemapRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.title = "Error";
  res.locals.description =
    "Unfortunately if you see this page we have either maintainance going on or page does not exist";

  res.locals.heading = err.status;
  res.locals.subHeading = err.message;
  res.locals.page = "error";
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.status = "OK";
  // render the error page
  res.status(err.status || 500);
  res.render("pages/error");
});

module.exports = app;
