/** Will handle all the routes for api */
const apiController = require("./apiController");
const databaseController = require("./databaseController");

module.exports = {
    /** Search for a stock through the TD API */
    searchTicker: (req, res) => {
        apiController.searchStock(req, res);
    },
    /** Try to save the stock to a database */
    saveToWatchlist: (req, res) => {
        databaseController.doStuff(req, res, "save");
    },
    getFromDatabase: (req, res) => {
        databaseController.doStuff(req, res, "retreive");
    }
};