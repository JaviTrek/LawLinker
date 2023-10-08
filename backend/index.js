import express from "express";
import cors from "cors"
import multer from "multer";
const app = express();
import dotenv from 'dotenv';
import axios from "axios";
import OpenAI from "openai";
import fs from "fs";
import tmp from "tmp-promise";
import connectMongo from "./connectMongo.js"
import mongoRoute from "./mongoRoute.js";

dotenv.config();

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
    //conecting to db
    connectMongo.connectToServer("morgan");
    console.log("Server Running, Port: 4000")
})


const configuration = new OpenAI({
    apiKey: process.env.CHATGPT,

});

const openai = new OpenAI(configuration);

//VOICE

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.post('/transcribe', upload.single('audio'), async (req, res) => {

    console.log("received transcribe")
    console.log(req.file)
    try {

        // Create a temporary file to save the buffer
        const tmpFile = await tmp.file({postfix: '.wav'});
        console.log("tmp pass")
        // Write the buffer to the temporary file
        await fs.promises.writeFile(tmpFile.path, req.file.buffer);
        console.log("fs promise pass")
        // Create a read stream from the temporary file
        const fileStream = fs.createReadStream(tmpFile.path);
        console.log("filestream pass")
        // Use the stream for transcription
        const transcript = await openai.audio.transcriptions.create({
            file: fileStream, model: "whisper-1",
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-4", messages: [{
                role: "user",
                content: `Given the provided narrative of a client's incident, please structure the information into the following format (a JSON object): 
                {\\"Contact Information\\": {\\"Full Name\\": \\"[Extracted Full Name]\\", \\"Phone Number\\": \\"[Extracted Phone Number]\\", \\"Email Address\\": \\"[Extracted Email Address]\\", \\"Languages Spoken\\": \\"[Extracted Languages]\\"}, \\"Basic Case Details\\": {\\"Case Type\\": \\"[Infer the Case Type]\\", \\"Date of Incident\\": \\"[Extracted Date]\\", \\"Location of Incident\\": \\"[Extracted Location]\\"}, \\"Detailed Incident Description\\": \\"[Extracted Detailed Description]\\", \\"Injuries or Damages\\": {\\"Description\\": \\"[Extracted Description of Injuries]\\", \\"Damages\\": [\\"[Extracted Damage 1]\\", \\"[Extracted Damage 2]\\", \\"...\\"]}, \\"Evidence\\": \\"[Extracted Details on Available Evidence]\\", \\"Preferred Outcome\\": \\"[Extracted or Inferred Desired Outcome]\\"}. 
                
                If any portion of the narrative is not in English, please translate it. Ensure the information is as accurate and comprehensive as possible based on the provided narrative. If any field or information is missing, simply put "Not provided by client". This is the description from the client: ${transcript.text}`
            }]
        })
        console.log("this is the transcript from your voice");
        console.log(transcript);

        console.log("message from chatgpt");
        console.log(completion.choices[0].message)
        
        res.set('Content-Type', 'text/plain');
        res.json({original: transcript.text, transcription: completion.choices[0].message.content});
        // Clean up: Close and remove the temporary file
        await tmpFile.cleanup();


    } catch (error) {
        console.error('Backend Error:', error.message);
        res.status(500).json({error: 'Error transcribing audio.', details: error.message});
    }


});

app.use('/mongo', mongoRoute);
// IMPLEMENT GPT





