// Test.js
import React from 'react';
import useForm from '../hooks/useForm';
import { validate } from '../validation/validateForm';

const Test = () => {
  const submitForm = (values) => {
    console.log('Form submitted with values: ', values);
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm({userName:'', email:''}, validate, submitForm);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={values.username || ''}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ''}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      {/* Add more input fields as needed */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;
