import React from 'react';
import regeneratorRuntime from "regenerator-runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import '../css/MicButton.css';

const TextToSpeech = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        return <span>Sorry, browser doesn't support speech recognition.</span>;
      }
    
      return (
        <div>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button className="micButton" onClick={SpeechRecognition.startListening}>Start</button>
          <button className="micButton" onClick={SpeechRecognition.stopListening}>Stop</button>
          <button className="micButton" onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </div>
      );
};

export default TextToSpeech;
