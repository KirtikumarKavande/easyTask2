import React from "react";
import classes from "./input.module.css";

const Myinput = (props) => {
  return (
    <div>
      <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor="email">{props.label}</label>
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    </div>
  );
};

export default Myinput;
