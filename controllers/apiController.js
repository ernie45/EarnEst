const axios = require("axios");
const searchUrl =  `https://api.tdameritrade.com/v1/marketdata/quotes?apikey=${process.env.TD_AUTH}&symbol=`;
const optionsUrl = `https://api.tdameritrade.com/v1/marketdata/chains?apikey=${process.env.TD_AUTH}&symbol=`

module.exports = {
    /** When a user searches a ticker */
    searchStock(req, res){
        axios.get(searchUrl + req.query.ticker).then(data =>{
            const tick = req.query.ticker;
            const upperCaseTick = tick.toUpperCase();
            res.send(data.data[upperCaseTick]);
        })
    },
    /** Handle retreiving updated info */
    updateInfo(req, res){
        console.log(`Just tesing with ${req.query.tickerArr}`);
    },
    searchOptionsChain(req, res){
        axios.get(`${optionsUrl}${req.query.ticker}&contractType=ALL&strikeCount=5&includeQuotes=TRUE&strategy=ANALYTICAL&interval=1&range=ALL&fromDate=2021-02-15&toDate=2021-02-19&optionType=ALL`).then(data => {
            const tick = req.query.ticker;
            const upperCaseTick = tick.toUpperCase();
            console.log(data.data);
            const weeklyCalls = data.data.callExpDateMap;
            const weeklyPuts = data.data.putExpDateMap;
            const options = {calls: weeklyCalls, puts: weeklyPuts}
            res.send(options);
        });
    }
};