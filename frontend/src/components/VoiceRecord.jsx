import React, { useState, useRef } from 'react';
import '../css/Client.css';
import axios from "axios";
import voice from '../assets/voice.svg';
import stopRec from '../assets/stopRec.svg';

function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [haveRecorded, setHaveRecorded] = useState(false);
  const [transcript, setTranscript] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [caseInfo, setCaseInfo] = useState(["Full Name", "Phone Number", "Email Address", "Languages Spoken", "Case Type", "Date Of Incident", "Location Of Incident", "Detailed Incident Description"]
  )
  const [missingStuff, setMissingStuff] = useState(false);
  const [caseObject, setCaseObject] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.onstart = () => {
      setTranscript(null);
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob);

      if (missingStuff) {
                formData.append("transcript", transcript);
                formData.append("missing", caseInfo);
                try {
                    await fetch('http://localhost:4000/addMissing', {
                        method: 'POST',
                        body: formData
                    }).then(response => response.json())
                        .then(async (data) => {
                            console.log(data);
                            setTranscript(transcript + " " + data.original.text);
                            setCaseInfo(data.transcript.missing)
                            if (data.transcript.missing.length === 0)  {
                                console.log("submit!!!");

                                setCaseInfo(["Your form is completed and submitted!"])
                                const response = await axios.post('http://localhost:4000/mongo/newCase', { data: data.transcript.case}); // adjust the URL if needed, e.g., 'http://localhost:4000/newCase'
                                console.log('Response from server:', response.data);
                            }

                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                } catch (error) {
                    console.error("Error transcribing:", error.message);
                }
            } else {


                setMissingStuff(true);

                try {
                    await fetch('http://localhost:4000/transcribe', {
                        method: 'POST',
                        body: formData
                    }).then(response => response.json())
                        .then(async (data) => {
                            console.log(data);
                            setTranscript(data.original.text);
                            setCaseObject(data.transcript)
                            setCaseInfo(data.transcript.missing)

                            if (data.transcript.missing.length === 0)  {
                                console.log("submit!!!");

                                setCaseInfo(["Your form is completed and submitted!"])
                                const response = await axios.post('http://localhost:4000/mongo/newCase', { data: data.transcript.case}); // adjust the URL if needed, e.g., 'http://localhost:4000/newCase'
                                console.log('Response from server:', response.data);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                } catch (error) {
                    console.error("Error transcribing:", error.message);
                }
            }
    };

    mediaRecorderRef.current.start();
    setHaveRecorded(false);
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setHaveRecorded(true);
      setRecording(false);
    }
  };

  return (
    <div className="topVoice">
      <div className="leftSide">
        {recording ? (
          <>
            <img
              src={stopRec}
              alt="voice-mic"
              className="leftTopImage"
              onClick={() => stopRecording()}
              disabled={!recording}
            ></img>
            <p className='loading-animation'>Listening...</p>
            </>
        ) : (
          <img
            src={voice}
            alt="voice-mic"
            className="leftTopImage"
            onClick={() => startRecording()}
            disabled={!recording}
          />
        )}
        {haveRecorded && !transcript ? <p className='loading-animation'>Converting to text...</p> : <p></p>}
        <div className="voice-container">
          {transcript ? (
            <p className="outText">{transcript}</p>
          ) : ( 
              <p className="mic">Tap mic icon to start recording</p>
          )}
          <div className="insideBox"></div>
        </div>
      </div>

      <div className="right-half">
        <h2 className="checklist">
          Ensure your case description<br></br> includes the following details
        </h2>
        <ul>
        {caseInfo.map((item, index) => (
                            <li className="listItem" key={index}>{item}</li>
                        ))}
          {/* <li># First Name</li>
          <li># Last Name</li>
          <li># Phone Number</li>
          <li># Zip Code</li>
          <li># Email Address</li>
          <li># Case Type</li>
          
          <li># Case Description</li> */}
        </ul>
      </div>
    </div>
  );
}

export default VoiceRecorder;