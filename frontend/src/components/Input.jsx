import '../css/FrontPage.css'

//VERY IMPORTANT TO IMPORT STYLING!
import "../css/Interface.css"
import {useState} from "react";

function CreateNewCase(e) {
    e.preventDefault();
    print()
}

export default function Input() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        address: '',
        phoneNumber: '',
        birthDate: '',
        natureOfCase: '', // can be something like contract dispute, felony drug chages, divorce and property divison, will drafting and probate
        desiredOutcome: '', // can be something like damages, injuntion, custody arrangement
        dateOfIncident: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <form className="form-container">
            <h2>New Case</h2>
            <div className="form-input">
                <label>First Name: </label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </div>
            <div className="form-input">
                <label>Last Name: </label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>
            <div className="form-input">
                <label>Email Address: </label>
                <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                />
            </div>
            <div className="form-input">
                <label>Address: </label>
                <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                />
            </div>
            <div className="form-input">
                <label>Phone Number: </label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
            </div>
            <div className="form-input">
                <label>Birthdate: </label>
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                />
            </div>
            <div className="form-input">
                <label>Nature of Case: </label>
                <input
                    type="text"
                    name="natureOfCase"
                    value={formData.natureOfCase}
                    onChange={handleChange}
                />
            </div>
            <div className="form-input">
                <label>Desired Outcome: </label>
                <input
                    type="text"
                    name="desiredOutcome"
                    value={formData.desiredOutcome}
                    onChange={handleChange}
                />
            </div>
            <div className="form-input">
                <label>Date of Incident: </label>
                <input
                    type="text"
                    name="dateOfIncident"
                    value={formData.dateOfIncident}
                    onChange={handleChange}
                />
            </div>
            <button onSubmit={CreateNewCase}>Create New Case</button>
        </form>
    );
}