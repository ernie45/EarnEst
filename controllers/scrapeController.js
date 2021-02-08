const axios = require("axios");
const url =  `https://api.tdameritrade.com/v1/marketdata/quotes?apikey=${process.env.TD_AUTH}&symbol=`;
const cheerio = require("cheerio");
//const stockController = require("./stockController");

module.exports = {
    /** Search for a stock through the TD API */
    searchTicker: (req, res) => {
        axios.get(url + req.query.ticker).then(data =>{
            const tick = req.query.ticker;
            const upperCaseTick = tick.toUpperCase();
            res.send(data.data[upperCaseTick]);
        })
    },
    /** Try to save the stock to a database */
    saveToWatchlist: (req, res) => {
        console.log("We are deep in the routes");
    }
};