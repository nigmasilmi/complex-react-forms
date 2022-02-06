import { useState } from "react";

const useInput = (validateValue) => {
  // the value for the input
  const [enteredValue, setEnteredValue] = useState("");

  // if it is touched or not
  const [isTouched, setIsTouched] = useState(false);

  // specific validation for the input
  const valueIsValid = validateValue(enteredValue);

  // errors
  const hasErrors = isTouched && !valueIsValid;
  const valueInputChangeHandler = (event) => {
    // is touching, so set to true
    setIsTouched(true);
    setEnteredValue(event.target.value);
  };

  // triggers onBlur
  const valueInputBlurHandler = () => {
    // onBlur means that tried to enter something and then went out
    // so, it was touched
    setIsTouched(true);
  };

  // resets the input

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  // the component where it is used must be able to know the states
  // and be able to change them
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasErrors,
    valueInputBlurHandler,
    valueInputChangeHandler,
    reset,
  };
};

export default useInput;
