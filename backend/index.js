import express from "express";
import cors from "cors"
import multer from "multer";
const app = express();
import dotenv from 'dotenv';
import axios from "axios";
import OpenAI from "openai";
import fs from "fs";
import tmp from "tmp-promise";

dotenv.config();

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
    console.log("Server Running, Port: 4000")
})


const configuration = new OpenAI({
    apiKey: process.env.CHATGPT,

});

const openai = new OpenAI(configuration);

//VOICE

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/transcribe', upload.single('audio'), async (req, res) => {

    console.log("received transcribe")
    console.log(req.file)
    try {

        // Create a temporary file to save the buffer
        const tmpFile = await tmp.file({ postfix: '.wav' });
        console.log("tmp pass")
        // Write the buffer to the temporary file
        await fs.promises.writeFile(tmpFile.path, req.file.buffer);
        console.log("fs promise pass")
        // Create a read stream from the temporary file
        const fileStream = fs.createReadStream(tmpFile.path);
        console.log("filestream pass")
        // Use the stream for transcription
        const transcript = await openai.audio.transcriptions.create({
            file: fileStream,
            model: "whisper-1",
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{
                role: "user", content:`Translate this to english, only respond with the translation, nothing else.: ${transcript.text}`
            }]
        })

        console.log(completion.choices[0].message)
        console.log(transcript);
        res.set('Content-Type', 'text/plain');
        res.json({ transcription: completion.choices[0].message.content});
        // Clean up: Close and remove the temporary file
        await tmpFile.cleanup();


    } catch (error) {
        console.error('Backend Error:', error.message);
        res.status(500).json({ error: 'Error transcribing audio.', details: error.message });
    }


});

// IMPLEMENT GPT





