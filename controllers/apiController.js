const axios = require("axios");
const { request } = require("express");
const searchUrl = `https://api.tdameritrade.com/v1/marketdata/quotes?apikey=${process.env.TD_AUTH}&symbol=`;
const optionsUrl = `https://api.tdameritrade.com/v1/marketdata/chains?apikey=${process.env.TD_AUTH}&symbol=`
const priceHistoryURL = `https://api.tdameritrade.com/v1/marketdata/`

module.exports = {
    /** When a user searches a ticker */
    searchStock(req, res) {
        axios.get(searchUrl + req.query.ticker).then(data => {
            const tick = req.query.ticker;
            const upperCaseTick = tick.toUpperCase();
            res.send(data.data[upperCaseTick]);
        })
    },
    /** Handle retreiving updated info */
    updateInfo(req, res) {
        console.log(`Just tesing with ${req.query.tickerArr}`);
    },
    /** Search weekly options chain using todays date and an expiration date */
    searchOptionsChain(req, res) {
        console.log("Searching for : " + req.query.expISODate);
        console.log("Also: " + req.query.todaysISODate);
        console.log("Ticker: " + req.query.ticker);
        axios.get(`${optionsUrl}${req.query.ticker}&contractType=ALL&strikeCount=5&includeQuotes=TRUE&strategy=ANALYTICAL&interval=1&range=ALL&fromDate=${req.query.todaysISODate}&toDate=${req.query.expISODate}&optionType=ALL`).then(data => {
            const weeklyCalls = data.data.callExpDateMap;
            const weeklyPuts = data.data.putExpDateMap;
            const options = { calls: weeklyCalls, puts: weeklyPuts }
            res.send(options);
        });
    },
    getPriceHistory(req, res){
        axios.get(`${priceHistoryURL}${req.query.ticker}/pricehistory?apikey=${process.env.TD_AUTH}&periodType=month&frequencyType=weekly&period=1&frequency=1`).then(data => {
            res.send(data.data.candles[3]);
        });
    }
};