/** Require express router */
const router = require("express").Router();
/** Require stocks router to be able to use their paths */
const stockRoutes = require("./stocks");

/** Define usage of the router */
/** This adds /stocks to the path of stockRoutes */
/** As of here, the path is /stocks */
router.use("/stocks", stockRoutes);

/** This will allow access from the api */
/** Instead of having to navigate to api/stocks */
/** It will be called in the index file above path */

// console.log(`Testing in ${__dirname}`);
module.exports = router;