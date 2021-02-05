/** Require express */
/** And its dependencies */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");

/** Define usage of express app */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/** Define express routing static path */
/** This is where everything will be directed from */
/** Without this line, the app doesn't know where to begin */ 
app.use(express.static("client/build"));
/** Add the routings to the express app */
app.use(routes);

/** Use port 3001 or the environment port */
const PORT = 3001;

app.listen(PORT, () => {
    console.log("App listening on port " + PORT);
});