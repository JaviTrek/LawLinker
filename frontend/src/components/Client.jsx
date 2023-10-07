import '../css/FrontPage.css';

//VERY IMPORTANT TO IMPORT STYLING!
import '../css/Interface.css';
import Form from './Form';

import voice from '../assets/voice.svg';

import Input from './Input.jsx';
import Output from './Output.jsx';
import { useForm } from 'react-hook-form';
import VoiceRecord from "./VoiceRecord.jsx";

export default function Client() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      zipCode: '',
      emailAddress: '',
      caseType: '',
      caseDescription: '',
    },
  });

  const submitNewCase = (formValues) => {
    console.log(formValues);
  };
  return (
    <div className="client">
      <h1 className="intro">
        Skip the hassle of typing. LawLinker's AI effortlessly transcribes your
        spoken responses
      </h1>
      {/* <img src={aiVoice} alt="" className="leftTopImage" /> */}
      <Form />
      <span className="orLine">OR</span>
      <span className="orLine-afterText">
        talk to our <br></br> AI assistance{' '}
      </span>
      <div className="voice-container">
        <div className="insideBox"></div>
        <button className="buttonVoice" onClick={() => console.log('ss')}>
          <img src={voice} alt="voice-mic" className="leftTopImage" />
        </button>
      </div>


        <h1>GPT</h1>
        <VoiceRecord/>
    </div>
  );
}
