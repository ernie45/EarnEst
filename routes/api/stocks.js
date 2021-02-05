/** Require express router to construct stocks routings */
const router = require("express").Router();
/** Require request to allow processing of stock website */
const axios = require("axios");
/** Require cheerio for parsing the website */
const cheerio = require("cheerio");
const scrapeController = require("../../controllers/scrapeController");

/** Construct the routings */
router.route("/").get((req, res) => {
    scrapeController.scrape(req, res);
})
module.exports = router;