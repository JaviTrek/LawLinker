import '../css/Interface.css';
import Form from './Form';
import voice from '../assets/voice.svg';
import Input from './Input.jsx';
import Output from './Output.jsx';
import { useForm } from 'react-hook-form';
import SingleCard from './SingleCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import searchImg from '../assets/search.svg';

export default function Attorney() {
  const [dbCard, setDbCard] = useState([]);
  useEffect(() => {
    const pingServer = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/mongo/attorney'
        );
        setDbCard(response.data);
      } catch (error) {
        console.error('Error pinging server:', error);
      }
    };

    pingServer();
  }, []);

  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter the cases based on caseType
  const filteredCases = dbCard.filter((caseItem) =>
    caseItem.basicCaseDetails?.caseType
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="textContainerAtt">
        <span className="descAtt">
          {' '}
          <br />
          Get to know your assigned cases that <br></br>have been filtered and
          organized by our
          <span className="tempAtt"> Assistant AI</span>
        </span>
      </div>
      <div className="imgContainerAtt">
        <img src={searchImg} alt=" -image" className="searchImageAtt" />
      </div>
      <input
        className="input-form"
        type="text"
        placeholder="Filter by Case Type"
        value={filter}
        onChange={handleFilterChange}
      />
      <div className="parent">
        <p className="casesIntro">Current Cases</p>

        {/* Render filtered cards */}
        {filteredCases.map((caseItem, index) => (
          <SingleCard key={index} value={caseItem} />
        ))}
      </div>
    </>
  );
}
// //VERY IMPORTANT TO IMPORT STYLING!
// import '../css/Interface.css';
// import Form from './Form';
// import voice from '../assets/voice.svg';
// import Input from './Input.jsx';
// import Output from './Output.jsx';
// import { useForm } from 'react-hook-form';
// import SingleCard from './SingleCard';

// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
// import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
// import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
// import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
// import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// export default function Attorney() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       phoneNumber: '',
//       zipCode: '',
//       emailAddress: '',
//       caseType: '',
//       caseDescription: '',
//     },
//   });

//   const submitNewCase = (formValues) => {
//     console.log(formValues);
//   };
//   return (
//     <div className="parent">
//       <p className="casesIntro">Current Cases</p>
//       <SingleCard></SingleCard>
//       <SingleCard></SingleCard>
//       <SingleCard></SingleCard>
//       <SingleCard></SingleCard>
//       <SingleCard></SingleCard>
//     </div>
//   );
// }
