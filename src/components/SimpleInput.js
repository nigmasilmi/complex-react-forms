import { useState } from "react";

const SimpleInput = (props) => {
  // piece needed to send to a backend
  const [enteredName, setEnteredName] = useState("");

  // piece that informs if the input is valid or not
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);

  // only validate if the input is touched => better ux
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  // triggers onChange
  const nameInputChangeHandler = (event) => {
    // is touching, so set to true
    setEnteredNameIsTouched(true);

    // simple validation, but to true if the user is correcting it
    if (event.target.value.trim() !== "") {
      setEnteredNameIsValid(true);
    }

    setEnteredName(event.target.value);
  };

  // triggers onBlur
  const nameInputBlurHandler = () => {
    // onBlur means that tried to enter something and then went out
    // so, it was touched
    setEnteredNameIsTouched(true);

    // simple validation
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
  };

  // triggers onSubmit
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // asume all fields were touched
    setEnteredNameIsTouched(true);

    // simple validation
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
    // passes the validation, then set to valid
    setEnteredNameIsValid(true);

    // clear the input
    setEnteredName("");
  };

  // combine isTouched + isValid
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
  // control the classes for validation feedback
  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
