import { useState } from 'react';

const useForm = (initialState, validate, submitCallback) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await submitCallback(values);
      } catch (error) {
        console.log('Error during submission:', error);
      }
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    resetForm
  };
};

export default useForm;
