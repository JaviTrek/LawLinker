import '../css/FrontPage.css';
import '../css/Client.css';
//VERY IMPORTANT TO IMPORT STYLING!
import '../css/Interface.css';
import Form from './Form';
import { useForm } from 'react-hook-form';
import VoiceRecord from "./VoiceRecord.jsx";

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
      <div className="intro-container">
        <h1 className="intro">
          Skip the hassle of typing. LawLinker's AI effortlessly transcribes your
          spoken responses
        </h1>
      </div>
      <VoiceRecord/>
    </div>
  );
}
