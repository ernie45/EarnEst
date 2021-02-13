/** Will handle all the routes for api */
const apiController = require("./apiController");
const databaseController = require("./databaseController");

module.exports = {
    /** Search for a stock through the TD API */
    searchTicker: (req, res) => {
        apiController.searchStock(req, res);
    },
    getFromDatabase: (req, res) => {
        databaseController.doStuff(req, res, "retreive");
    },
    /** Try to save the stock to a database */
    saveToWatchlist: (req, res) => {
        databaseController.doStuff(req, res, "save");
    },
    removeFromWatchlist: (req, res) => {
        databaseController.doStuff(req, res, "delete");
    },
    searchOptionsChain: (req, res) => {
        apiController.searchOptionsChain(req, res);
    }
};