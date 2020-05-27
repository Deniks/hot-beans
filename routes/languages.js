const express = require("express");
const router = express.Router();

router.get("/:lang", (req, res) => {
  const { lang } = req.params;
  const cookie = lang === "en" ? "en" : lang === "ru" ? "ru" : "fr";
  console.log(cookie);
  res.cookie("i18n", cookie);
  res.redirect("/");
});

module.exports = router;
