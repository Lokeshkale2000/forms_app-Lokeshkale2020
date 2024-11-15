import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CreateForm = () => {
  const [label, setLabel] = useState("My New Form");
  const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();

  const addInput = (type) => {
    const defaultValues = {
      text: { label: "Text Field", placeholder: "Enter text here" },
      email: { label: "Email Field", placeholder: "Enter your email" },
      password: { label: "Password Field", placeholder: "Enter your password" },
      number: { label: "Number Field", placeholder: "Enter a number" },
      date: { label: "Date Field", placeholder: "Select a date" },
    };
    if (inputs.length < 20) {
      setInputs([...inputs, { type, ...defaultValues[type] }]);
    } else {
      alert("Maximum of 20 fields allowed.");
    }
  };

  const handleInputChange = (index, key, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][key] = value;
    setInputs(updatedInputs);
  };

  const handleSaveForm = async () => {
    if (!label.trim()) {
      alert("Please enter a form title.");
      return;
    }

    if (inputs.length === 0) {
      alert("Please add at least one field to the form.");
      return;
    }

    try {
      const newForm = { label, inputs };
      await axios.post("hhttps://form-builder-backend-peach.vercel.app/api/form", newForm);
      navigate("/");
    } catch (error) {
      console.error("Error saving form", error);
    }
  };

  return (
    <div className="container">
      <h1>Create Form</h1>
      <input
        type="text"
        placeholder="Form Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        style={{padding:"7px"}}
      />
      <div className="form-controls">
        <button onClick={() => addInput("text")} style={{background:'blue',color:'white'}}>Add Text</button>
        <button onClick={() => addInput("email")} style={{background:'blue',color:'white'}}>Add Email</button>
        <button onClick={() => addInput("password")} style={{background:'blue',color:'white'}}>Add Password</button>
        <button onClick={() => addInput("number")} style={{background:'blue',color:'white'}}>Add Number</button>
        <button onClick={() => addInput("date")} style={{background:'blue',color:'white'}}>Add Date</button>
      </div>
      {inputs.map((input, index) => (
        <div key={index}>
          <h3>{input.type}</h3>
          <input
            type="text"
            placeholder="Input Label"
            value={input.label}
            onChange={(e) => handleInputChange(index, "label", e.target.value)}
            style={{padding:'7px',marginTop:'10px'}}
          />
          <br></br>
          <input
            type="text"
            placeholder={input.placeholder}
            value={input.placeholder}
            onChange={(e) =>
              handleInputChange(index, "placeholder", e.target.value)
              
            }
            style={{padding:'7px',marginTop:'10px'}}
          />
        </div>
      ))}
      <button className="primary" onClick={handleSaveForm} style={{marginTop:'10px'}}>
        Save Form
      </button>
    </div>
  );
};

export default CreateForm;
