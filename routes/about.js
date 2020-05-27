const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  res.render("pages/about", {
    title: "About Us",
    page: "about",
    description:
      "In this page users can find out everything what is related to our company history, production and etc.",
    heading: "High Quality Websites",
    subHeading: "Provided in time!",
    i18n: res,
  });
});

module.exports = router;
