import React from 'react';
import { useForm } from 'react-hook-form';
import '../css/Client.css';
import submit from '../assets/submit.svg';

const Form = () => {
  const { control, register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="lebal-form">First Name</label>
        <input className="input-form" {...register('firstName')} />
        <label className="lebal-form">Last Name</label>
        <input className="input-form" {...register('lastName')} />
        <label className="lebal-form">Phone Number</label>
        <input className="input-form" {...register('phoneNumber')} />
        <label className="lebal-form">Zip Code</label>
        <input className="input-form" {...register('zipCode')} />
        <label className="lebal-form">Email Address</label>
        <input className="input-form" {...register('emailAddress')} />

        <label className="lebal-form">Case Type</label>
        <select className="input-form" {...register('caseType')}>
          <option value="carAccident">Car Accident</option>
          <option value="medicalInjury">Medical Injury</option>
          <option value="Slip-and-Fall">Slip and Fall</option>
          <option value="Hurt-at-work">Hurt at work</option>
          <option value=">nursingHome">Nursing Home</option>
          <option value="defectiveProducts">Defective Products</option>
          <option value="dangerousDrugs">Dangerous Drugs</option>
          <option value="insuranceDispute">Insurance dispute</option>
          <option value="employmentIssue<">Employment Issue</option>
        </select>
        <div className="centerDiv">
          <input className="submitButton" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Form;
