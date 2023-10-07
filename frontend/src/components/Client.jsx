import '../css/FrontPage.css';

//VERY IMPORTANT TO IMPORT STYLING!
import '../css/Interface.css';
import Form from './Form';
import TextToSpeechButton from './TextToSpeechButton';

import Input from './Input.jsx';
import Output from './Output.jsx';
import { useForm } from 'react-hook-form';

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
      <Form></Form>
      <TextToSpeech></TextToSpeech>
      {/* <button className="landingButton">Text to Speech</button> */}
    </div>
  );
}
