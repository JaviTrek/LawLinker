import React from 'react';
import regeneratorRuntime from "regenerator-runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import {useState, useEffect} from "react";
import '../css/MicButton.css';

const TextToSpeech = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      const [isListening, setIsListening] = useState(false);

        const handleToggleListening = () => {
            if (!isListening) {
                SpeechRecognition.startListening({ continuous: true });
            } else {
                SpeechRecognition.stopListening();
                resetTranscript(); 
            }

            setIsListening((prevState) => !prevState);
        };

      if (!browserSupportsSpeechRecognition) {
        return <span>Sorry, the browser doesn't support speech recognition.</span>;
      }
    
      return (
        <div>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button className="micButton" onClick={handleToggleListening}>
            {isListening ? 'Stop' : 'Start'}
          </button>
          <button className="micButton" onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </div>
      );
};

export default TextToSpeech;
