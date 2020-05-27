const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  let xml_content = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`,

    `<url>`,
    `<loc>http://hot-beans.herokuapp.com/</loc>`,
    `<lastmod>2020-05-21T10:38:59+00:00</lastmod>`,
    `<priority>1.00</priority>`,
    `</url>`,
    `<url>`,
    `<loc>http://hot-beans.herokuapp.com/products</loc>`,
    `<lastmod>2020-05-21T10:38:59+00:00</lastmod>`,
    `<priority>0.80</priority>`,
    `</url>`,
    `<url>`,
    `<loc>http://hot-beans.herokuapp.com/about</loc>`,
    `<lastmod>2020-05-21T10:38:59+00:00</lastmod>`,
    `<priority>0.80</priority>`,
    `</url>`,
    `<url>`,
    `<loc>http://hot-beans.herokuapp.com/careers</loc>`,
    `<lastmod>2020-05-21T10:38:59+00:00</lastmod>`,
    `<priority>0.80</priority>`,
    `</url>`,
    `<url>`,
    `<loc>http://hot-beans.herokuapp.com/contacts</loc>`,
    `<lastmod>2020-05-21T10:38:59+00:00</lastmod>`,
    `<priority>0.80</priority>`,
    `</url>`,
    `</urlset>`,
  ];
  res.set("Content-Type", "text/xml");
  res.send(xml_content.join("\n"));
});

module.exports = router;
