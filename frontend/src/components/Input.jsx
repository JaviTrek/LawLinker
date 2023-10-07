// import '../css/FrontPage.css'

//VERY IMPORTANT TO IMPORT STYLING!
import "../css/Interface.css"
import {useForm} from "react-hook-form";

// function CreateNewCase(e) {
//     e.preventDefault();
//     print()
// }

export default function Input() {
    const {
        register, 
        handleSubmit, 
        reset,
        formState:{errors},
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            zipCode: "",
            emailAddress: "",
            caseType: "",
            caseDescription: "",
        },
    });

    const submitNewCase = (formValues) => {
        console.log(formValues)
        reset();
    }

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
                    className="input-field"
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
                <label>Phone Number: </label>
                <input
                    className="input-field"
                    type="text"
                    // name="phoneNumber"
                    // value={formData.phoneNumber}
                    // onChange={handleChange}
                    {...register('phoneNumber', {required: "Required"})}
                />
                <p className="error-message">{errors.phoneNumber?.message}</p>
            </div>
            <div className="form-input">
                <label>Zip Code: </label>
                <input
                    className="input-field"
                    type="text"
                    // name="phoneNumber"
                    // value={formData.phoneNumber}
                    // onChange={handleChange}
                    {...register('zipCode', {required: "Required"})}
                />
                <p className="error-message">{errors.zipCode?.message}</p>
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
                <label>Case Type: </label>
                <input
                    className="input-field"
                    type="text"
                    // name="natureOfCase"
                    // value={formData.natureOfCase}
                    // onChange={handleChange}
                    {...register('caseType', {required: "Required"})}
                />                
                <p className="error-message">{errors.caseType?.message}</p>
            </div>
            <div className="form-input">
                <label>Case Description: </label>
                <textarea
                    className="input-field"
                    rows="4"
                    // name="desiredOutcome"
                    // value={formData.desiredOutcome}
                    // onChange={handleChange}
                    {...register('caseDescription', {required: "Required"})}
                />
                <p className="error-message">{errors.caseDescription?.message}</p>
            </div>
            <button type="submit">Create New Case</button>
        </form>
    );
}