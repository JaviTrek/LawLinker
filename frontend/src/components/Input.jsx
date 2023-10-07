import '../css/FrontPage.css'

//VERY IMPORTANT TO IMPORT STYLING!
import "../css/Interface.css"
import {useState} from "react";

export default function Input() {
    const [formData, setFormData] = useState({
        textInput: '',
        numberInput: 0,
        emailInput: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <form className="input">
            <h2>Input Component</h2>
            <div>
                <label>Text Input:</label>
                <input
                    type="text"
                    name="textInput"
                    value={formData.textInput}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Number Input:</label>
                <input
                    type="number"
                    name="numberInput"
                    value={formData.numberInput}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email Input:</label>
                <input
                    type="email"
                    name="emailInput"
                    value={formData.emailInput}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}


