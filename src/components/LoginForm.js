import React, { useRef, useState } from "react";
import useInput from "../hooks/use-input";
import classes from "./loginForm.module.css";

const isEmail = (value) => {
  var reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reg.test(value) === false) {
    return false;
  } else {
    return true;
  }
};

const BasicForm = (props) => {
  const password = useRef();
  const [error, seterror] = useState(false);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueCHangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const FormSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredEmailIsValid) {
      return;
    }
    const enteredPassword = password.current.value;
    const userEmail = localStorage.getItem("email");
    const userPassword = localStorage.getItem("password");
    if (enteredEmail === userEmail && userPassword === enteredPassword) {
      alert("you are successfully logged in");
      seterror(false);
    } else {
      seterror(true);
    }
    resetEmailInput();
  };

  return (
    <form onSubmit={FormSubmitHandler}>
      <div className={classes.formControl}>
        <h1>LogIn</h1>
        <div className={classes.m}>
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

        <div className={classes.m}>
          <label htmlFor="password">Password</label>
          <input type="password" id="pwd" ref={password} />
        </div>
        {error && (
          <p className="valueInvalid">Email or Password is Incorrect</p>
        )}
        <div className="form-actions">
          <button className={classes.button}>Login</button>
        </div>
      </div>
    </form>
  );
};

export default BasicForm;
