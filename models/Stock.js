/** Require the mongoose ORM */
const mongoose = require("mongoose");
/** Reference the mongoose schema */
const Schema = mongoose.Schema;

/** Create the schema appropriate to the situation */
const stockSchema = new Schema({
    /** Ticker is required */
    ticker: {
        type: String,
        required: true
    },
    lastPrice: {
        type: String, 
        required: true
    }
});

/** Define the model for Stocks using the previous schema */
const Stock = mongoose.model("Stock", stockSchema);
/** Export the model */
module.export = Stock;