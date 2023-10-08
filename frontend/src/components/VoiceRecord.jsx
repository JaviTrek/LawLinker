import React, { useState, useRef } from 'react';
import '../css/Client.css';

import voice from '../assets/voice.svg';
import stopRec from '../assets/stopRec.svg';

function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [caseInfo, setCaseInfo] = useState(null);

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
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob);

      try {
        await fetch('http://localhost:4000/transcribe', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.original);
            setTranscript(data.original);
            setCaseInfo(data.transcript);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.error('Error transcribing:', error.message);
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
    <div className="topVoice">
      <div className="leftSide">
        {recording ? (
          <img
            src={stopRec}
            alt="voice-mic"
            className="leftTopImage"
            onClick={() => stopRecording()}
            disabled={!recording}
          ></img>
        ) : (
          <img
            src={voice}
            alt="voice-mic"
            className="leftTopImage"
            onClick={() => startRecording()}
            disabled={!recording}
          />
        )}
        <div className="voice-container">
          {transcript ? (
            <p className="outText">{transcript}</p>
          ) : (
            <p className="mic">Tap mic icon to start recording</p>
          )}
          <div className="insideBox"></div>
        </div>
      </div>

      <div class="right-half">
        <h2 className="checklist">
          Ensure your case description<br></br> includes the following details
        </h2>
        <ul>
          <li># First Name</li>
          <li># Last Name</li>
          <li># Phone Number</li>
          <li># Zip Code</li>
          <li># Email Address</li>
          <li># Case Type</li>
          <li># Case Description</li>
        </ul>
      </div>
    </div>
  );
}

export default VoiceRecorder;
