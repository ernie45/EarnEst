import axios from "axios";
export default {
    /** Receive parameters to search for a stock */
    searchSpecificTicker: tick => {
        return axios.get("/api/stocks/", {
            params:{
                ticker: tick
            }
        });
    },
    /** Receive parameters to save to a database */
    saveTicker: tic => {
        return axios.get("api/stocks/saveToWatchlist", {
            params: {
                tick: tic
            }
        });
    },
    getSavedTickers: data => {
        return axios.get("api/stocks/retreiveSavedTickers");
    }
};