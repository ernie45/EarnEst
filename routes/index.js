/** Require express router */
const router = require("express").Router();
/** Require api routes to redefine */
/** These can be called from api without routing into the actual file */
/** Because api folder has an index file that exports */
const apiRoutes = require("./api");

/** This function adds /api to the path of apiRoutes */
router.use("/api", apiRoutes);

module.exports = router;