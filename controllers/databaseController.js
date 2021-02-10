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
            /** Grab an array of all the database elements */
            var databaseComponents = await col.find().toArray();
            
            /** If the saving route is triggered */
            if (action === "save"){
                /** Will be true if the searched  ticker is in database */
                var inDatabase = false;
                /** Traverse the database */
                for (var i = 0; i < databaseComponents.length; i++){
                    /** If an element in the database matches the query */
                    if (databaseComponents[i].name === req.query.tick){
                        /** Let the app know the query exists in the database already */
                        inDatabase = true;
                    }
                }
                /** If query is not in the database */
                if (!inDatabase){
                    /** Save it into the database */
                    let stockDocument = {
                        "name": req.query.tick
                    }
                    await col.insertOne(stockDocument);
                }
                else{console.log("Already in the database")}
                console.log(databaseComponents);
                // Insert a single document, wait for promise so we can read it back
                
                
            }
            
            else if (action === "retreive"){
                res.send(databaseComponents);
            }
            
            } catch (err) {
            console.log(err.stack);
        }
 
        finally {
            await client.close();
        }
    }

}