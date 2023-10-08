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

// import React, { useState, useRef } from 'react';
// import '../css/Client.css';

// import voice from '../assets/voice.svg';
// import stopRec from '../assets/stopRec.svg';

// function VoiceRecorder() {
//   const [recording, setRecording] = useState(false);
//   const [transcript, setTranscript] = useState(true);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const [caseInfo, setCaseInfo] = useState(null);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorderRef.current = new MediaRecorder(stream);

//     mediaRecorderRef.current.onstart = () => {
//       audioChunksRef.current = [];
//     };

//     mediaRecorderRef.current.ondataavailable = (event) => {
//       audioChunksRef.current.push(event.data);
//     };

//     mediaRecorderRef.current.onstop = async () => {
//       const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//       const formData = new FormData();
//       formData.append('audio', audioBlob);

//       try {
//         await fetch('http://localhost:4000/transcribe', {
//           method: 'POST',
//           body: formData,
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log(data.original);
//             setTranscript(data.original);
//             setCaseInfo(data.transcript);
//           })
//           .catch((error) => {
//             console.error('Error:', error);
//           });
//       } catch (error) {
//         console.error('Error transcribing:', error.message);
//       }
//     };

//     mediaRecorderRef.current.start();
//     setRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   return (
//     <div className="topVoice">
//       <div className="leftSide">
//         {recording ? (
//           <img
//             src={stopRec}
//             alt="voice-mic"
//             className="leftTopImage"
//             onClick={() => stopRecording()}
//             disabled={!recording}
//           ></img>
//         ) : (
//           <img
//             src={voice}
//             alt="voice-mic"
//             className="leftTopImage"
//             onClick={() => startRecording()}
//             disabled={!recording}
//           />
//         )}
//         <div className="voice-container">
//           {transcript ? (
//             <p className="outText">
//               ""hudchisdhidhcihnoihciowhdcoiwhodicoiw bcwoicbwiohiochwioc
//               jbewiucbwuei{transcript}
//             </p>
//           ) : (
//             <p>Tap mic icon to start recording</p>
//           )}
//           <div className="insideBox"></div>
//         </div>
//       </div>

//       <div class="right-half">
//         <h2 className="checklist">
//           Ensure your case description<br></br> includes the following details
//         </h2>
//         <ul>
//           <li># First Name</li>
//           <li># Last Name</li>
//           <li># Phone Number</li>
//           <li># Zip Code</li>
//           <li># Email Address</li>
//           <li># Case Type</li>
//           <li># Case Description</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default VoiceRecorder;

// import React, { useState, useRef } from "react";
// import '../css/Client.css';

// import voice from '../assets/voice.svg';
// import stopRec from '../assets/stopRec.svg';
// import axios from "axios";



// function VoiceRecorder() {
//     const [recording, setRecording] = useState(false);
//     const [transcript, setTranscript] = useState(null);
//     const mediaRecorderRef = useRef(null);
//     const audioChunksRef = useRef([]);
//     const [caseInfo, setCaseInfo] = useState(["Full Name", "Phone Number", "Email Address", "Languages Spoken", "Case Type", "Date Of Incident", "Location Of Incident", "Detailed Incident Description"]
//     )
//     const [missingStuff, setMissingStuff] = useState(false);
//     const [caseObject, setCaseObject] = useState(null);

//     const startRecording = async () => {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         mediaRecorderRef.current = new MediaRecorder(stream);

//         mediaRecorderRef.current.onstart = () => {
//             audioChunksRef.current = [];
//         };

//         mediaRecorderRef.current.ondataavailable = (event) => {
//             audioChunksRef.current.push(event.data);
//         };

//         mediaRecorderRef.current.onstop = async () => {
//             const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
//             const formData = new FormData();
//             formData.append('audio', audioBlob);

//             if (missingStuff) {
//                 formData.append("transcript", transcript);
//                 formData.append("missing", caseInfo);
//                 try {
//                     await fetch('http://localhost:4000/addMissing', {
//                         method: 'POST',
//                         body: formData
//                     }).then(response => response.json())
//                         .then(async (data) => {
//                             console.log(data);
//                             setTranscript(transcript + " " + data.original.text);

//                             if (data.transcript.missing.length === 0)  {
//                                 console.log("submit!!!");

//                                 const response = await axios.post('http://localhost:4000/mongo/newCase', { data: data.transcript.case}); // adjust the URL if needed, e.g., 'http://localhost:4000/newCase'
//                                 console.log('Response from server:', response.data);


//                             }
//                             setCaseInfo(data.transcript.missing)
//                         })
//                         .catch(error => {
//                             console.error('Error:', error);
//                         });
//                 } catch (error) {
//                     console.error("Error transcribing:", error.message);
//                 }
//             } else {


//                 setMissingStuff(true);

//                 try {
//                     await fetch('http://localhost:4000/transcribe', {
//                         method: 'POST',
//                         body: formData
//                     }).then(response => response.json())
//                         .then(data => {
//                             console.log(data);
//                             setTranscript(data.original.text);
//                             setCaseObject(data.transcript)
//                             setCaseInfo(data.transcript.missing)
//                         })
//                         .catch(error => {
//                             console.error('Error:', error);
//                         });
//                 } catch (error) {
//                     console.error("Error transcribing:", error.message);
//                 }
//             }
//         };

//         mediaRecorderRef.current.start();
//         setRecording(true);
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current) {
//             mediaRecorderRef.current.stop();
//             setRecording(false);
//         }
//     };

//     return (
//         <div> 
//             {recording ? <img src={stopRec} alt="voice-mic" className="leftTopImage"  onClick={() => stopRecording()} disabled={!recording}></img> : 
//             <img src={voice} alt="voice-mic" className="leftTopImage"  onClick={() => startRecording()} disabled={!recording}/>}
//             <div className="voice-container">
//                 {transcript ? <p>{transcript}</p> : <p>Click the Mic Button to Start Recording</p>}
//                 <div className="insideBox"></div>
//             </div>
//             <div className="right-half">
//                 <h2 className="checklist">Please include the following information in your case description: </h2>
//                 <ul>
//                         {caseInfo.map((item, index) => (
//                             <li className="listItem" key={index}>{item}</li>
//                         ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default VoiceRecorder;
