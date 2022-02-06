import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      isTouched: true,
      value: state.value,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // specific validation for the input
  const valueIsValid = validateValue(inputState.value);

  // errors
  const hasErrors = inputState.isTouched && !valueIsValid;
  const valueInputChangeHandler = (event) => {
    // is touching, so set to true
    dispatch({ type: "INPUT", value: event.target.value });
  };

  // triggers onBlur
  const valueInputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  // resets the input

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  // the component where it is used must be able to know the states
  // and be able to change them
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasErrors,
    valueInputBlurHandler,
    valueInputChangeHandler,
    reset,
  };
};

export default useInput;
