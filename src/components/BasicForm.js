import useInput from "../hooks/use-input";
const BasicForm = (props) => {
  // Name
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasErrors: nameHasErrors,
    valueInputBlurHandler: nameInputBlurHandler,
    valueInputChangeHandler: nameInputChangeHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  // LastName
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasErrors: lastNameHasErrors,
    valueInputBlurHandler: lastNameInputBlurHandler,
    valueInputChangeHandler: lastNameInputChangeHandler,
    reset: resetlastName,
  } = useInput((value) => value.trim() !== "");

  // email
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasErrors: emailHasErrors,
    valueInputBlurHandler: emailInputBlurHandler,
    valueInputChangeHandler: emailInputChangeHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  formIsValid = nameIsValid && lastNameIsValid && emailIsValid;
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetName();
    resetlastName();
    resetEmail();
  };
  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div
          className={nameHasErrors ? "form-control invalid" : "form-control"}
        >
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
            value={nameValue}
          />
          {nameHasErrors && (
            <p className="error-text">Name must not be empty</p>
          )}
        </div>
        <div
          className={
            lastNameHasErrors ? "form-control invalid" : "form-control"
          }
        >
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={lastNameValue}
          />
          {lastNameHasErrors && (
            <p className="error-text">Last Name must not be empty</p>
          )}
        </div>
      </div>
      <div className={emailHasErrors ? "form-control invalid" : "form-control"}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={emailValue}
        />
        {emailHasErrors && (
          <p className="error-text">Email must be a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
