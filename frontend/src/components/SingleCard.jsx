import React, { useEffect, useState } from 'react';
import '../css/Attorney.css';
import doneImg from '../assets/done.svg';

const SingleCard = ({ value }) => {
  if (!value || !value.basicCaseDetails || !value.contactInformation) {
    return null; // or render a placeholder or error message
  }
  useEffect(() => {
    if (value) {
      console.log(value.basicCaseDetails.caseType);
    }
  }, [value]);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`card ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`}>
      <div className="ch-row">
        <div className="ch-col1">
          <div className="caseName">{value.basicCaseDetails.caseType}</div>
          <label className="berforOut">Date of Incident: </label>
          <span className="caseType">
            {value.basicCaseDetails.dateOfIncident}
          </span>
          <br />
          <label className="berforOut">Location of Incident: </label>
          <span className="caseType">
            {value.basicCaseDetails.locationOfIncident}
          </span>
        </div>
        <div className="Name">
          <label className="berforOut">Full Name:</label>
          <span className="first">{value.contactInformation.fullName}</span>
          <br />
          <label className="berforOut">Phone Number: </label>
          <span className="first">{value.contactInformation.phoneNumber}</span>

          <br />
          <label className="berforOut">Email Address: </label>
          <span className="first">{value.contactInformation.emailAddress}</span>
          <br />
          <label className="berforOut">Languages Spoken: </label>
          <span className="first">
            {value.contactInformation.languagesSpoken}
          </span>
        </div>
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
                  <label className="berforOut">Incident Description: </label>
                  <span className="textDesc">
                    {value.detailedIncidentDescription}
                  </span>
                </div>
                <div className="evidence">
                  <label className="berforOut">Evidence: </label>
                  <span className="textDesc">{value.evidence}</span>
                </div>
                <div className="injuriesOrDamages">
                  <label className="berforOut">Injuries Description: </label>
                  <span className="textDesc">
                    {value.injuriesOrDamages.description}
                  </span>
                  <br />
                  <label className="berforOut">Damages: </label>
                  <span className="textDesc">
                    {value.injuriesOrDamages.damages.join(', ')}
                  </span>
                </div>
                <div className="preferredOutcome">
                  <label className="berforOut">Preferred Outcome: </label>
                  <span className="textDesc">{value.preferredOutcome}</span>
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