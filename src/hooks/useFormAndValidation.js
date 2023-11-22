import { useCallback, useState } from "react";

export const useFormAndValidation = (inputValues) => {
  const [ values, setValues ] = useState(inputValues);
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(true);

  const handleChange = (event) => {
    const {name, value} = event.target;
    const ancestor = event.target.closest('form')
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: event.target.validationMessage});
    (ancestor !== null) && setIsValid(ancestor.checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false)=> {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setErrors, setIsValid };
}

