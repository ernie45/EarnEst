const axios = require("axios");
const url =  `https://api.tdameritrade.com/v1/marketdata/quotes?apikey=${process.env.TD_AUTH}&symbol=`;
const cheerio = require("cheerio");
//const stockController = require("./stockController");

module.exports = {
     searchTicker: (req, res) => {
         axios.get(url + req.query.ticker).then(data =>{
            const tick = req.query.ticker;
            const upperCaseTick = tick.toUpperCase();
            res.send(data.data[upperCaseTick]);
         })
    },
    saveToWatchlist: (req, res) => {
        console.log("We are deep in the routes");
    }
};