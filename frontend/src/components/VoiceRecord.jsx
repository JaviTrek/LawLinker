import React, { useState, useRef } from "react";
import '../css/Client.css';

import voice from '../assets/voice.svg';
import stopRec from '../assets/stopRec.svg';


function VoiceRecorder() {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [transcript, setTranscript] = useState()

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.onstart = () => {
            audioChunksRef.current = [];
        };

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
            const formData = new FormData();
            formData.append('audio', audioBlob);

            try {
                 await fetch('http://localhost:4000/transcribe', {
                    method: 'POST',
                    body: formData
                }).then(response => response.json())
                     .then(data => {
                         console.log(data);
                         console.log(data.missing);
                         setAudioUrl(data.transcription);
                     })
                     .catch(error => {
                         console.error('Error:', error);
                     });
            } catch (error) {
                console.error("Error transcribing:", error.message);
            }
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    return (
        <div> 
            {recording ? <img src={stopRec} alt="voice-mic" className="leftTopImage"  onClick={() => stopRecording()} disabled={!recording}></img> : 
            <img src={voice} alt="voice-mic" className="leftTopImage"  onClick={() => startRecording()} disabled={!recording}/>}
            <div className="voice-container">
                {audioUrl ? <p>{audioUrl}</p> : <p>Click the Mic Button to Start Recording</p>}
                <div className="insideBox"></div>
            </div>
        </div>
    );
}

export default VoiceRecorder;
