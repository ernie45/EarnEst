const axios = require("axios");
const url =  `https://api.tdameritrade.com/v1/marketdata/quotes?apikey=${process.env.TD_AUTH}&symbol=`;

module.exports = {
    /** When a user searches a ticker */
    searchStock(req, res){
        axios.get(url + req.query.ticker).then(data =>{
            const tick = req.query.ticker;
            const upperCaseTick = tick.toUpperCase();
            res.send(data.data[upperCaseTick]);
        })
    },
    /** Handle retreiving updated info */
    updateInfo(req, res){
        console.log(`Just tesing with ${req.query.tickerArr}`);
    }
};