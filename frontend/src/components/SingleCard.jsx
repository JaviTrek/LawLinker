import React, { useState } from 'react';
import '../css/Attorney.css';
import doneImg from '../assets/done.svg';

const SingleCard = ({ value }) => {
  const {
    caseName,
    clientFname,
    clientLname,
    clientPhoneNumber,
    clientZipCode,
    clientEmail,
    caseType,
    caseDescription,
    dateCreated,
  } = value;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleAccordion = () => {
    console.log(value);
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`card ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`}>
      <div className="ch-row">
        <div className="ch-col1">
          <div className="caseName">{caseName}</div>
          <lebal className="berforOut">Case Type: </lebal>
          <span className="caseType">{caseType}</span>
        </div>
        <div className="Name">
          <lebal className="berforOut"> First Name:</lebal>
          <span className="first">
            {clientFname}
            <br></br>
          </span>
          <lebal className="berforOut">Last Name: </lebal>
          <span className="last">
            {''}
            {clientLname}
          </span>
        </div>
        <lebal className="berforOut">Date Created: </lebal>
        <span className="Date">{dateCreated}</span>
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
                    {caseDescription}
                  </span>
                </div>
                <div className="clientConnect">
                  <lebal className="berforOut">Phone Number: </lebal>
                  <span className="phone">
                    {clientPhoneNumber}
                    <br></br>
                  </span>
                  <lebal className="berforOut">Email Address: </lebal>
                  <span className="email">{clientEmail}</span>
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
