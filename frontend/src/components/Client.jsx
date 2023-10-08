import '../css/FrontPage.css';
import '../css/Client.css';
import '../css/Interface.css';

import Form from './Form';
import { useForm } from 'react-hook-form';
import VoiceRecord from './VoiceRecord.jsx';
import aiVoice from '../assets/aiVoice.svg';

export default function Client() {
  const {
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

  return (
    <div className="client">
      <img src={aiVoice} alt="" className="voiceAi" />
      <div className="intro-container">
        <h1 className="intro">
          Skip the hassle of typing{' '}
          <span className="tempC"> LawLinker's AI</span> <br></br>effortlessly
          transcribes your spoken responses
        </h1>
      </div>
      <VoiceRecord />
    </div>
  );
}