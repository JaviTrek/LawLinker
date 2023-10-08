import {MongoClient, ServerApiVersion} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, strict: true, deprecationErrors: true,
    }
});

let db;
export default {
    connectToServer: async (dbName) => {
        console.log("try to connect")
        try {
            await client.connect();
            db = client.db(dbName)
            console.log(`connected to mongoDB "${dbName}" collection correctly`)

        } catch (e) {
            console.error(e);
            console.log('failed to connect to mongoDB')
        }

    }, getDatabase: () => {
        return db
    }

}