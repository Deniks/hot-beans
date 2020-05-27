const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  req.headers["accept-language"];
  res.setHeader(
    "Set-Cookie",
    "HttpOnly;Secure;SameSite=Strict",
    "accept-language"
  );

  if (req.cookies.i18n === undefined) {
    req.setLocale("en");
  } else {
    res.setLocale(req.cookies.i18n);
  }
  res.render("pages/index", {
    title: "Home",
    page: "home",
    description:
      "Hot Beans home page and overall representation of our company",
    heading: "High Quality Websites",
    subHeading: "Provided in time!",
    i18n: res,
  });
});

module.exports = router;
