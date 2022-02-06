import { useState } from "react";

const SimpleInput = (props) => {
  // piece needed to send to a backend
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  //name-- only validate if the input is touched => better ux
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  // email--touching the email input field
  const [emailInputIsTouched, setInputEmailIsTouched] = useState(false);

  //name-- derived constant that informs if the input is valid or not
  const enteredNameIsValid = enteredName.trim() !== "";

  // name--combine isTouched + isValid
  const nameInputIsInvalid = enteredNameIsTouched && !enteredNameIsValid;
  // validate email
  const emailIsValid = enteredEmail.includes("@");
  // email -- combine emailInputIsTouched + enteredEmail
  const enteredEmailIsInvalid = !emailIsValid && emailInputIsTouched;

  // overall form validity with derived states
  let formIsValid = false;
  formIsValid = enteredNameIsValid && !enteredEmailIsInvalid;

  //name -- triggers onChange
  const nameInputChangeHandler = (event) => {
    // is touching, so set to true
    setEnteredNameIsTouched(true);
    setEnteredName(event.target.value);
  };

  // email -- triggers on change
  const emailInputChangeHandler = (event) => {
    // touching -- true
    setInputEmailIsTouched(true);
    // set the entered email to its value
    setEnteredEmail(event.target.value);
  };

  // email -- triggers on blur
  const emailInputBlurHandler = (event) => {
    // email field is touched
    setInputEmailIsTouched(true);
    // set the entered email to its value
    setEnteredEmail(event.target.value);
  };

  // triggers onBlur
  const nameInputBlurHandler = () => {
    // onBlur means that tried to enter something and then went out
    // so, it was touched
    setEnteredNameIsTouched(true);
  };

  // triggers onSubmit
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // asume all fields were touched
    setEnteredNameIsTouched(true);
    setInputEmailIsTouched(true);

    // check if is not valid
    if (!enteredNameIsValid || enteredEmailIsInvalid) {
      return;
    }

    // if the validation passes, clear the input and reset to untouched
    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameIsTouched(false);
    setInputEmailIsTouched(false);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div
        className={nameInputIsInvalid ? "form-control invalid" : "form-control"}
      >
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

      <div
        className={
          enteredEmailIsInvalid ? "form-control invalid" : "form-control"
        }
      >
        <label htmlFor="email">Your Email</label>
        <input
          // type email adds a full email validation
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Email must be a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
