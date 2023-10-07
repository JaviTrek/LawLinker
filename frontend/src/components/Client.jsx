import '../css/FrontPage.css'

//VERY IMPORTANT TO IMPORT STYLING!
import "../css/Interface.css"

import Input from "./Input.jsx";
import Output from "./Output.jsx";

export default function Client() {

  return (
    <div className="client">
      <h1>Client page</h1>
      <p className="read-the-docs">
        I'm ready to be worked on!
      </p>
        <Input/>
        <Output/>
    </div>
  )
}

