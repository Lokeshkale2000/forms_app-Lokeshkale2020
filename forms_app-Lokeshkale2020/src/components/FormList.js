import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormList = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);


  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('https://form-builder-backend-peach.vercel.app/api/forms');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms', error);
      }
    };
    fetchForms();
  }, []);

  
  const handleDeleteForm = async (id) => {
    try {
      await axios.delete(`https://form-builder-backend-peach.vercel.app/api/form/${id}`);
      setForms(forms.filter((form) => form._id !== id)); 
    } catch (error) {
      console.error('Error deleting form', error);
    }
  };

  return (
    <div className="container form-list">
      <h1>Form List</h1>
      <button className="primary" onClick={() => navigate("/form/create")}>
        Create New Form
      </button>
      {forms.length === 0 ? (
        <p>No forms available. Please create a new form.</p>
      ) : (
        <ul>
          {forms.map((form) => (
            <li key={form._id}>
              <span>{form.label || `Form ${form._id}`}</span>
              <button
                className="edit"
                onClick={() => navigate(`/form/${form._id}/edit`)}
              >
                Edit
              </button>
              <button
                className="primary"
                onClick={() => navigate(`/form/${form._id}`)}
              >
                View
              </button>
              <button
                className="delete"
                onClick={() => handleDeleteForm(form._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormList;
