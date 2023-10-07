import express from "express";
import cors from "cors"
const app = express();
import dotenv from 'dotenv';

dotenv.config();

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
    console.log("Server Running, Port: 4000")
})

// IMPLEMENT GPT
