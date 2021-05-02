import React, { useState } from "react";
import styles from "./LogIn.module.css";
import LoginImage from "./Assets/Images/LoginImage.svg";

function LogIn({ onLogIn }) {
  const [username, updateUsername] = useState();
  const [password, updatePassword] = useState();
  const [error, updateError] = useState();
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (username) {
      if (password) {
        const data = { username: username, password: password };
        if (typeof onLogIn === "function") {
          onLogIn(data, updateErrorMessage);
        }
      } else {
        updateError("Please Enter your password");
      }
    } else {
      updateError("Please enter your username");
    }
  };
  const updateErrorMessage = (e) => {
    updateError(e?.toString() || "");
  };
  return (
    <div className={styles.SignUp}>
      <div className={styles.imageContainer}>
        <img src={LoginImage} alt={"SignUp Image"}></img>
      </div>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit(e);
          }}>
          <h1 className={styles.title}>Log In</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              updateUsername(e.target.value);
            }}
            className={styles.inputfield}></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              updatePassword(e.target.value);
            }}
            className={styles.inputfield}></input>

          <input type="Submit" value="Submit" className={styles.submit}></input>
        </form>
        <p className={styles.Error}>{error}</p>
      </div>
    </div>
  );
}
export default LogIn;
