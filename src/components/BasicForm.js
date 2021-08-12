import React, { useRef } from "react";

import useInput from "../hooks/use-input";
const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const isEmail = (value) => {
  var reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(value) === false) {
    return false;
  } else {
    return true;
  }
};

const validatePhoneNumber = (input_str) => {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(input_str);
};

function isAlphaNumeric(pwd) {
  var re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  if (re.test(pwd) === false) {
    return false;
  } else {
    return true;
  }
}
const passwordMatchHandler = (enteredPassword, enteredCPassword) => {
  if (enteredPassword === enteredCPassword) {
    return true;
  } else {
    return false;
  }
};

const BasicForm = (props) => {
  const selectionInputRef = useRef();

  const {
    value: enteredFirstName,
    hasError: firstNameInputHasError,
    valueCHangeHandler: FirstNameChangeHandler,
    inputBlurHandler: FirstNameBlurHandler,
    isValid: enteredFirstNameIsValid,
    reset: resetFirstNameInput,
  } = useInput(isNotEmpty);

  const {
    value: phoneNumber,
    hasError: phoneInputHasError,
    valueCHangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    isValid: enteredphoneIsValid,
    reset: resetphoneInput,
  } = useInput(validatePhoneNumber);

  const {
    value: enteredLastName,
    hasError: LastNameInputHasError,
    valueCHangeHandler: LastNameChangeHandler,
    inputBlurHandler: LastNameBlurHandler,
    isValid: enteredLastNameIsValid,
    reset: resetLastNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueCHangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueCHangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    isValid: enteredpasswordIsValid,
    reset: resetPasswordInput,
  } = useInput(isAlphaNumeric);

  const {
    value: enteredCPassword,
    hasError: CpasswordInputHasError,
    valueCHangeHandler: CpasswordChangeHandler,
    inputBlurHandler: CpasswordBlurHandler,
    isValid: CpasswordIsValid,
    reset: CresetPasswordInput,
  } = useInput(isAlphaNumeric);

  let formIsValid = false;
  if (enteredFirstNameIsValid && enteredLastNameIsValid) {
    formIsValid = true;
  }

  const error = passwordMatchHandler(enteredCPassword, enteredPassword);

  const FormSubmitHandler = () => {
    if (
      !enteredFirstNameIsValid &&
      !enteredLastNameIsValid &&
      !enteredEmailIsValid &&
      !enteredphoneIsValid &&
      !enteredpasswordIsValid &&
      !CpasswordIsValid
    ) {
      return;
    }
    const selectBoxValue = selectionInputRef.current.value;
    localStorage.setItem("_id", Math.floor(Math.random() * 100));
    localStorage.setItem("firstName", enteredFirstName);
    localStorage.setItem("lastName", enteredLastName);
    localStorage.setItem("email", enteredEmail);
    localStorage.setItem("user", selectBoxValue);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("password", enteredPassword);

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetphoneInput();
    resetPasswordInput();
    CresetPasswordInput();
  };

  const style = (errorState) => {
    if (errorState) {
      return "form-control invalid";
    } else {
      return "form-control";
    }
  };

  return (
    <form onSubmit={FormSubmitHandler}>
      <h1>Sign up</h1>
      <div className="control-group">
        <div className={style(firstNameInputHasError)}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="firstName"
            onChange={FirstNameChangeHandler}
            onBlur={FirstNameBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError && (
            <p className="valueInvalid"> First Name is Not Valid</p>
          )}
        </div>
      </div>
      <div className={style(LastNameInputHasError)}>
        <label htmlFor="name">Last Name</label>
        <input
          type="text"
          id="LastName"
          onChange={LastNameChangeHandler}
          onBlur={LastNameBlurHandler}
          value={enteredLastName}
        />
        {LastNameInputHasError && (
          <p className="valueInvalid"> Last Name is Not Valid</p>
        )}
      </div>

      <div className={style(emailInputHasError)}>
        <label htmlFor="name">E-Mail</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="valueInvalid"> Invalid Email</p>}
      </div>

      <div className={style(phoneInputHasError)}>
        <label htmlFor="name">Phone Number</label>
        <input
          type="text"
          id="phone"
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler}
          value={phoneNumber}
        />
        {phoneInputHasError && (
          <p className="valueInvalid"> Invalid Phone Number</p>
        )}
      </div>
      <div className={"form-control"}>
        <label htmlFor="usertype">UserType</label>
        <select ref={selectionInputRef}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      <div className={style(passwordInputHasError)}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="pwd"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
        />
        {passwordInputHasError && (
          <p className="valueInvalid">Password Must Be Alpha Numeric</p>
        )}
      </div>

      <div className={style(CpasswordInputHasError)}>
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          id="cpwd"
          onChange={CpasswordChangeHandler}
          onBlur={CpasswordBlurHandler}
          value={enteredCPassword}
        />
        {CpasswordInputHasError && !error && (
          <p className="valueInvalid"> Password Does Not Match</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
