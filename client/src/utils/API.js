import axios from "axios";
export default {
    searchSpecificTicker: tick => {
        return axios.get("/api/stocks/", {
            params:{
                ticker: tick
            }
        });
    },
    saveTicker: tick => {
        return axios.put("api/stocks/saveToWatchlist", {
            params: {
                ticker: tick
            }
        });
    }
};