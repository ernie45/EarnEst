const axios = require("axios").default;
const cheerio = require("cheerio");
//const stockController = require("./stockController");

module.exports = {
     scrape: async (req, res) => {
        /* const html =  await axios.get('https://www.robinhood.com/');
        const $ = await cheerio.load(JSON.stringify(html.data));
        res.send($.html());
        console.log($.html()); */
    }
};