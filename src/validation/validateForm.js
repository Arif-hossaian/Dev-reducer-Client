// validate.js
// export const validate = (values) => {
//     let errors = {};
  
//     if (!values.username || !values.username.trim()) {
//       errors.username = 'Username required';
//     }
  
//     if (!values.email) {
//       errors.email = 'Email required';
//     } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//       errors.email = 'Email address is invalid';
//     }
  
//     // Add more field validations as needed
  
//     return errors;
//   };


  export const validate = (values) => {
    let errors = {};
  
    if (!values.title || !values.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!values.description || !values.description.trim()) {
        errors.description = 'Description is required';
      }

  
    return errors;
  };
  