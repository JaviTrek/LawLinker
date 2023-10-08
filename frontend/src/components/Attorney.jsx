//VERY IMPORTANT TO IMPORT STYLING!
import '../css/Interface.css';
import Form from './Form';
import voice from '../assets/voice.svg';
import Input from './Input.jsx';
import Output from './Output.jsx';
import { useForm } from 'react-hook-form';
import SingleCard from './SingleCard';
import { useState } from 'react';

export default function Attorney() {
  const [filter, setFilter] = useState('');

  const casesData = [
    {
      caseName: 'Car Accsident case',
      clientFname: 'Abdullah',
      clientLname: 'Al Hinaey',
      clientPhoneNumber: '4079558206',
      clientZipCode: '32927',
      clientEmail: 'axs@gmail.com',
      caseType: 'Car Accsident',
      caseDescription:
        'Depending on the circumstances and the severity of the accident, you may want to consult with an attorney,',
      dateCreated: '22/2/2023',
      // Other case data...
    },
    {
      caseName: 'Car Accsident case',
      clientFname: 'me',
      clientLname: 'Al Hinaey',
      clientPhoneNumber: '4079558206',
      clientZipCode: '32927',
      clientEmail: 'axs@gmail.com',
      caseType: 'Car Accsident',
      caseDescription:
        'Depending on the circumstances and the severity of the accident, you may want to consult with an attorney,',
      dateCreated: '22/2/2023',
    },

    {
      caseName: 'car Accsident case',
      clientFname: 'bro',
      clientLname: 'Al Hinaey',
      clientPhoneNumber: '4079558206',
      clientZipCode: '32927',
      clientEmail: 'axs@gmail.com',
      caseType: 'killing Accsident',
      caseDescription:
        'Depending on the circumstances and the severity of the accident, you may want to consult with an attorney,',
      dateCreated: '22/2/2023',
      // Other case data...
    },
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCases = casesData.filter(
    (caseItem) => caseItem.caseType.toLowerCase().includes(filter.toLowerCase()) // Case-insensitive filter
  );

  return (
    <>
      <input
        type="text"
        placeholder="Filter by Case Type"
        value={filter}
        onChange={handleFilterChange}
        style={{
          flex: '2',
          backgroundColor: 'white',
        }}
      />
      <div className="parent">
        <p className="casesIntro">Current Cases</p>

        {/* Filter input */}

        {/* Render filtered cards */}
        {filteredCases.map((caseItem, index) => (
          <SingleCard key={index} value={caseItem} />
        ))}
      </div>
    </>
  );
}
