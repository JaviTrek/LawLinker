// import '../css/FrontPage.css'

//VERY IMPORTANT TO IMPORT STYLING!
import "../css/Interface.css"
// import {useState} from "react";
import {useForm} from "react-hook-form";

// function CreateNewCase(e) {
//     e.preventDefault();
//     print()
// }

export default function Input() {
    const {
        register, 
        handleSubmit, 
        formState:{errors}
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
            address: "",
            phoneNumber: "",
            birthDate: "",
            natureOfCase: "",
            desiredOutcome: "",
            dateOfIncident: "",
        }
    });

    const submitNewCase = (formValues) => {
        console.log(formValues)
    }

    // const [formData, setFormData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     emailAddress: '',
    //     address: '',
    //     phoneNumber: '',
    //     birthDate: '',
    //     natureOfCase: '', // can be something like contract dispute, felony drug chages, divorce and property divison, will drafting and probate
    //     desiredOutcome: '', // can be something like damages, injuntion, custody arrangement
    //     dateOfIncident: '',
    // });

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData(prevData => ({ ...prevData, [name]: value }));
    // };

    return (
        <form className="form-container" onSubmit={handleSubmit(submitNewCase)}>
            <h2>New Case</h2>
            <div className="form-input">
                <label>First Name: </label>
                <input
                    type="text"
                        // name="firstName"
                        // value={formData.firstName}
                        // onChange={handleChange}
                    {...register('firstName', {required: "Required"})}
                />
                <p className="error-message">{errors.firstName?.message}</p>
            </div>
            <div className="form-input">
                <label>Last Name: </label>
                <input
                    className="input-field"
                    type="text"
                        // name="lastName"
                        // value={formData.lastName}
                        // onChange={handleChange}
                    {...register('lastName', {required: "Required"})}
                />
                <p className="error-message">{errors.lastName?.message}</p>
            </div>
            <div className="form-input">
                <label>Email Address: </label>
                <input
                    className="input-field"
                    type="email"
                    // name="emailAddress"
                    // value={formData.emailAddress}
                    // onChange={handleChange}
                    {...register('emailAddress', {required: "Required"})}
                />
                <p className="error-message">{errors.emailAddress?.message}</p>
            </div>
            <div className="form-input">
                <label>Address: </label>
                <input
                    type="text"
                    // name="address"
                    // value={formData.emailAddress}
                    // onChange={handleChange}
                    {...register('address', {required: "Required"})}
                />
                <p className="error-message">{errors.address?.message}</p>
            </div>
            <div className="form-input">
                <label>Phone Number: </label>
                <input
                    type="text"
                    // name="phoneNumber"
                    // value={formData.phoneNumber}
                    // onChange={handleChange}
                    {...register('phoneNumber', {required: "Required"})}
                />
                <p className="error-message">{errors.phoneNumber?.message}</p>
            </div>
            <div className="form-input">
                <label>Birthdate: </label>
                <input
                    type="date"
                    // name="birthDate"
                    // value={formData.birthDate}
                    // onChange={handleChange}
                    {...register('birthDate', {required: "Required"})}
                />
                <p className="error-message">{errors.birthDate?.message}</p>
            </div>
            <div className="form-input">
                <label>Nature of Case: </label>
                <input
                    type="text"
                    // name="natureOfCase"
                    // value={formData.natureOfCase}
                    // onChange={handleChange}
                    {...register('natureOfCase', {required: "Required"})}
                    placeholder="e.g. divorce "
                />                
                <p className="error-message">{errors.natureOfCase?.message}</p>
            </div>
            <div className="form-input">
                <label>Desired Outcome: </label>
                <input
                    type="text"
                    // name="desiredOutcome"
                    // value={formData.desiredOutcome}
                    // onChange={handleChange}
                    {...register('desiredOutcome', {required: "Required"})}
                    placeholder="e.g. custody arrangement"
                />
                <p className="error-message">{errors.desiredOutcome?.message}</p>
            </div>
            <div className="form-input">
                <label>Date of Incident: </label>
                <input
                    type="date"
                    // name="dateOfIncident"
                    // value={formData.dateOfIncident}
                    // onChange={handleChange}
                    {...register('dateOfIncident', {required: "Required"})}
                />
                <p className="error-message">{errors.dateOfIncident?.message}</p>
            </div>
            <button type="submit">Create New Case</button>
        </form>
    );
}