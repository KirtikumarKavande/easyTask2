import React, { useEffect, useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  console.log("action", action);
  console.log("state",state)
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "INPUT_PASSWORD") {
    return { value: action.value, isValid: action.value.length > 6 };
  }

  if (action.type === "ISVALID_PASSWORD") {
    return { value: state.value, isValid: state.value.length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [statePassword, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [enteredCollege, setEnteredCollege] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      emailState.isValid &&
        statePassword.value.trim().length > 6 &&
        enteredCollege.trim().length > 4
    );
  };

  // useEffect(() => {
  //   const identifer = setTimeout(() => {
  //     console.log("executing...");

  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6 && enteredCollege.trim().length >4
  //     );
  //   }, 500);

  //   return () => {
  //     console.log("cleanUP");
  //     clearTimeout(identifer);
  //   };
  // }, [enteredEmail, enteredPassword, enteredCollege]);

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "INPUT_PASSWORD", value: event.target.value });

    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };
  const collegeChangeHandler = (e) => {
    setEnteredCollege(e.target.value);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.value.includes("@"));
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validateCollegedHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 6);
  };

  const validatePasswordHandler = (e) => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "ISVALID_PASSWORD" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("isLoggedIn", "1");
    props.onLogin(emailState.value, statePassword.value, enteredCollege);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            statePassword.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={statePassword.value}
            onChange={passwordChangeHandler}
            onBlur={validateCollegedHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label>College Name</label>
          <input
            type="text"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
