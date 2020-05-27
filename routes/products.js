const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("pages/products", {
    title: "Products",
    page: "products",
    description:
      "On this page users can get familiar with our latest and featured projects",
    heading: "High Quality Websites",
    subHeading: "Provided in time!",
    i18n: res,
  });
});

module.exports = router;
