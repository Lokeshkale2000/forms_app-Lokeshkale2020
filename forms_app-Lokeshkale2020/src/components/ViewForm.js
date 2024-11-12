import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const ViewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
   
    const fetchForm = async () => {
      try {
        const response = await axios.get(`https://form-builder-backend-peach.vercel.app/api/form/${id}`);
        const currentForm = response.data;

        if (currentForm) {
          setForm({
            ...currentForm,
            inputs: currentForm.inputs.map((input) => ({
              ...input,
              placeholder: input.placeholder || `Enter ${input.type}`,
            })),
          });
        }
      } catch (error) {
        console.error('Error fetching form', error);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

 

  if (!form) return <div>Loading...</div>;

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>Back</button>
      <h1 style={{marginTop:'10px',marginBottom:'10px'}}>{form.label}</h1>
      {form.inputs.map((input, index) => (
        <div key={index}>
          <label style={{marginTop:'10px',marginLeft:"10px"}}>{input.label}</label>
          <br></br>
          <input style={{marginTop:'10px',marginLeft:"10px", padding:"7px"}}
            type={input.type}
            placeholder={input.placeholder}
            onChange={(e) => handleChange(input.label, e.target.value)}
          />
        </div>
      ))}
   
    </div>
  );
};

export default ViewForm;
