import express from "express";
import db from "./connectMongo.js";

const router = express.Router();

router.post("/newCase", async (req, res) => {
    const database = db.getDatabase()
    // db and collection code goes here
    const coll = database.collection("cases");
    // insert code goes here
    const docs = {
        name: "Javi",
        caseType: "Civil Court",
        languageSpoken: ["spanish", "french"],
        caseSummary: "was attacked by cat, want to sue neighbor for being angry"
    };const result = await coll.insertOne(docs);
    console.log(result);
    console.log("Victory has been achieved!")
});

router.get("/attorney", async (req, res) => {
    const database = db.getDatabase()
    // db and collection code goes here
    const coll = database.collection("attorney");
    // insert code goes here
    console.log("trying to get attorney")
    try {
        const items = await coll.find({}).toArray();
        console.log(items)
        res.json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).send('Internal Server Error');
    }

    console.log("Victory has been achieved!")
});

export default router;