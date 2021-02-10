const axios = require("axios");
const url =  `https://api.tdameritrade.com/v1/marketdata/quotes?apikey=${process.env.TD_AUTH}&symbol=`;

module.exports = {
    searchStock(req, res){
        axios.get(url + req.query.ticker).then(data =>{
            const tick = req.query.ticker;
            const upperCaseTick = tick.toUpperCase();
            res.send(data.data[upperCaseTick]);
        })
    }
};