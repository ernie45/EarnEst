const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.8mjvy.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(url);

// The database to use
const dbName = "stock";

module.exports = {
    async doStuff(req, res, action, callback) {
        try {
            await client.connect();

            const db = client.db(dbName);
            // Use the collection "people"
            const col = db.collection("ticker");
            /** Grab an array of all the database elements */
            var databaseComponents = await col.find().toArray();

            /** If the saving route is triggered */
            if (action === "save") {
                /** Save it into the database */
                let stockDocument = {
                    "name": req.query.tick
                }
                await col.insertOne(stockDocument);
                const newBase = await col.find().toArray();
                res.send(newBase);
            }

            else if (action === "retreive") {
                res.send(databaseComponents);
            }
            else if (action === "delete") {
                await col.findOneAndDelete({ name: req.query.name });
                const newBase = await col.find().toArray();
                res.send(newBase);
            }

        } catch (err) {
            console.log(err.stack);
        }

        /* finally {
            await client.close();
        } */
    }

}