//VERY IMPORTANT TO IMPORT STYLING!
import '../css/Interface.css';
import Form from './Form';
import voice from '../assets/voice.svg';
import Input from './Input.jsx';
import Output from './Output.jsx';
import { useForm } from 'react-hook-form';
import SingleCard from './SingleCard';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export default function Attorney() {
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
    <div className="parent">
      <p className="casesIntro">Current Cases</p>
      <SingleCard></SingleCard>
      <SingleCard></SingleCard>
      <SingleCard></SingleCard>
      <SingleCard></SingleCard>
      <SingleCard></SingleCard>
    </div>
  );
}
