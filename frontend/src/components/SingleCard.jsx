import React, { useState } from 'react';
import '../css/Attorney.css';
import doneImg from '../assets/done.svg';

const SingleCard = () => {
  const caseFake2 = {
    caseName: '',
    clientFname: '',
    clientLname: '',
    clientPhoneNumber: '',
    clientZipCode: '',
    clientEmail: '',
    caseType: '',
    caseDescription: '',
    dateCreated: '',
  };

  const caseFake = {
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
  };
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`card ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`}>
      <div className="ch-row">
        <div className="ch-col1">
          <div className="caseName">{caseFake.caseName}</div>
          <lebal className="berforOut">Case Type: </lebal>
          <span className="caseType">{caseFake.caseType}</span>
        </div>
        <div className="Name">
          <lebal className="berforOut"> First Name:</lebal>
          <span className="first">
            {caseFake.clientFname}
            <br></br>
          </span>
          <lebal className="berforOut">Last Name: </lebal>
          <span className="last">
            {''}
            {caseFake.clientLname}
          </span>
        </div>
        <lebal className="berforOut">Date Created: </lebal>
        <span className="Date">{caseFake.dateCreated}</span>
      </div>

      <div className="row1 more-fields">
        <div className="accordion col-full">
          <dl>
            <dt>
              <a
                href="#accordion1"
                aria-expanded={!isCollapsed}
                aria-controls="accordion1"
                className="accordion-title accordionTitle js-accordionTrigger"
                onClick={toggleAccordion}
              >
                More Info
              </a>
            </dt>
            <dd
              className={`accordion-content accordionItem ${
                isCollapsed ? 'is-collapsed' : ''
              }`}
              id="accordion1"
              aria-hidden={isCollapsed}
            >
              <div className="expandedContainer">
                <div className="caseDes">
                  <lebal className="berforOut">Case Description: </lebal>

                  <span className="textDesc">
                    <br></br>
                    {caseFake.caseDescription}
                  </span>
                </div>
                <div className="clientConnect">
                  <lebal className="berforOut">Phone Number: </lebal>
                  <span className="phone">
                    {caseFake.clientPhoneNumber}
                    <br></br>
                  </span>
                  <lebal className="berforOut">Email Address: </lebal>
                  <span className="email">{caseFake.clientEmail}</span>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
