const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.8mjvy.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(url);
 
// The database to use
const dbName = "stock";

module.exports = {
    async doStuff(req, res, action) {
        try {
            await client.connect();
            console.log("Connected correctly to server");

            const db = client.db(dbName);
            // Use the collection "people"
            const col = db.collection("ticker");
            
            if (action === "save"){
                let stockDocument = {
                    "name": req.query.tick
                }
                // Insert a single document, wait for promise so we can read it back
                const p = await col.insertOne(stockDocument);
            }
            
            else if (action === "retreive"){
                // Insert a single document, wait for promise so we can read it back
                // const p = await col.find();
                // res.send(p.data);
                console.log("trying the database");
            }
            
            } catch (err) {
            console.log(err.stack);
        }
 
        finally {
            await client.close();
        }
    }

}