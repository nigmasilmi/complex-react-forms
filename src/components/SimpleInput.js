import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasErrors: nameInputHasErrors,
    valueInputChangeHandler: nameChangedHandler,
    valueInputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasErrors: emailInputHasErrors,
    valueInputChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  // overall form validity with derived states
  let formIsValid = false;
  formIsValid = enteredNameIsValid && enteredEmailIsValid;

  // triggers onSubmit
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // check if is not valid
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    resetName();
    resetEmail();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div
        className={nameInputHasErrors ? "form-control invalid" : "form-control"}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasErrors && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>

      <div
        className={
          emailInputHasErrors ? "form-control invalid" : "form-control"
        }
      >
        <label htmlFor="email">Your Email</label>
        <input
          // type email adds a full email validation
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasErrors && (
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
