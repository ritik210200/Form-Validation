import React, { useState } from "react";
import "./App.css";
import Form from "./Form";
import Success from "./Success";

const App = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
  
    // Check if there are no form errors
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
    }
  };
  

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  if (submitted) {
    return <Success />;
  }

  return (
    <Form
      formValues={formValues}
      formErrors={formErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default App;
