/** Require express router to construct stocks routings */
const router = require("express").Router();
/** Require request to allow processing of stock website */
const axios = require("axios");
/** Require cheerio for parsing the website */
const cheerio = require("cheerio");
const routingController = require("../../controllers/routingController");


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ernesto45:453Rnesto@cluster0.8mjvy.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});




/** Construct the routings */
router.route("/").get((req, res) => {
    routingController.searchTicker(req, res);
});
/** Send info to access database */
router.route("/saveToWatchlist/").get((req, res) => {
    routingController.saveToWatchlist(req, res);
});

router.route("/retreiveSavedTickers/").get((req, res) => {
  routingController.getFromDatabase(req, res);
});


module.exports = router;