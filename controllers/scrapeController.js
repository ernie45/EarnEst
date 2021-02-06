const axios = require("axios");
const url =  `https://api.tdameritrade.com/v1/marketdata/quotes?apikey=${process.env.TD_AUTH}&symbol=tsla`;
const cheerio = require("cheerio");
//const stockController = require("./stockController");

module.exports = {
     scrape: async (req, res) => {
        axios.get(url).then(data => {
            res.send(data.data["TSLA"].totalVolume);
        });
    }
};