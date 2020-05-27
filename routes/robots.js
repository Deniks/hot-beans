const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.type("text/plain");

  res.send(
    "User-agent: *\nSitemap: http://www.hot-beans.herokuapp.com/sitemap.xml"
  );
});

module.exports = router;
