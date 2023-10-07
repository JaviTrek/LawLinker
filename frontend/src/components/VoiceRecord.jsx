import React, { useState, useRef } from "react";

function VoiceRecorder() {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

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
                const response = await fetch('http://localhost:4000/transcribe', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                setAudioUrl(data.text);
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
            <button onClick={startRecording} disabled={recording}>Start Recording</button>
            <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
            {audioUrl && <p>{audioUrl}</p>}
        </div>
    );
}

export default VoiceRecorder;
