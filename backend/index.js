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

    try {

        // Create a temporary file to save the buffer
        const tmpFile = await tmp.file({postfix: '.wav'});
        // Write the buffer to the temporary file
        await fs.promises.writeFile(tmpFile.path, req.file.buffer);
        // Create a read stream from the temporary file
        const fileStream = fs.createReadStream(tmpFile.path);
        console.log("Waiting to transcribe all data!")
        // Use the stream for transcription
        const transcript = await openai.audio.transcriptions.create({
            file: fileStream, model: "whisper-1",
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-4", messages: [{
                role: "user",
                content: `Given the provided narrative of a client's incident, please structure the information into the following format, but make sure your response is in a stringified json with an attribute "case" for everything below and an attribute "missing" information for any of the fields the client did not provide. Here is the properties for case.  
                 
                           {
                "contactInformation": {
                    "fullName": "[Extracted Full Name]",
                    "phoneNumber": "[Extracted Phone Number]",
                    "emailAddress": "[Extracted Email Address]",
                    "languagesSpoken": "[Extracted Languages]"
                },
                "basicCaseDetails": {
                    "caseType": "[Infer the Case Type]",
                    "dateOfIncident": "[Extracted Date]",
                    "locationOfIncident": "[Extracted Location]"
                },
                "detailedIncidentDescription": "[Extracted Detailed Description Summarized for better understanding]",
                "injuriesOrDamages": {
                    "description": "[Extracted Description of Injuries]",
                    "damages": ["[Extracted Damage 1]", "[Extracted Damage 2]", "..."]
                },
                "evidence": "[Extracted Details on Available Evidence]",
                "preferredOutcome": "[Extracted or Inferred Desired Outcome]"
            }
                
                If any portion of the narrative is not in English, please translate it. Ensure the information is as accurate and comprehensive as possible based on the provided narrative. If any field or information is missing, do not add that field to "case" instead add the field to the "missing" attribute. The missing attribute should be an array of strings of what's missing. 
                
                This is the description from the client: ${transcript.text} REMEMBER YOUR RESPONSE IS IN A STRINGIFIED JSON, DO NOT RESPOND IN ANY OTHER FORMAT!`
            }]
        })

        console.log(completion.choices[0].message);


        const parsedData = JSON.parse(JSON.parse(completion.choices[0].message.content));
        console.log(parsedData)
        console.log(transcript);
        res.set('Content-Type', 'text/plain');
        res.json(parsedData);
        // Clean up: Close and remove the temporary file
        await tmpFile.cleanup();


    } catch (error) {
        console.error('Backend Error:', error.message);
        res.status(500).json({error: 'Error transcribing audio.', details: error.message});
    }


});

app.use('/mongo', mongoRoute);
// IMPLEMENT GPT





