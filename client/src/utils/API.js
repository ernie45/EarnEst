import axios from "axios";
export default {
    /** Receive parameters to search for a stock */
    searchSpecificTicker: tick => {
        return axios.get("/api/stocks/", {
            params: {
                ticker: tick
            }
        });
    },
    /** Get Tickers saved on the database */
    getSavedTickers: data => {
        return axios.get("/api/stocks/retreiveSavedTickers/");
    },
    /** Receive parameters to save to a database */
    saveTicker: tic => {
        return axios.get("/api/stocks/saveToWatchlist/", {
            params: {
                tick: tic
            }
        });
    },
    /** Receive parameters to delete from database */
    removeFromWatchlist: name => {
        return axios.get("/api/stocks/removeFromWatchlist/", {
            params: {
                name: name
            }
        });
    },
    /** Retreive weekly options chain */
    searchOptionsChain: (ticker, todaysISODate, expISODate) => {
        return axios.get("/api/stocks/searchOptionsChain/", {
            params: {
                ticker: ticker,
                todaysISODate: todaysISODate,
                expISODate: expISODate
            }
        });
    },
    getPriceHistory: ticker => {
        return axios.get("/api/stocks/getPriceHistory/", {
            params: {
                ticker: ticker
            }
        });
    }
};