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
    <div className={styles.LogIn}>
      <div className={styles.container}>
        <img className={styles.image} src={LoginImage}></img>
        <div className={styles.FormContainer}>
          <h1>Log In</h1>
          <form onSubmit={onFormSubmit}>
            <input
              type="text"
              className={styles.text}
              placeholder={"Username"}
              value={username}
              onChange={(e) => {
                e.preventDefault();
                updateUsername(e.target.value);
              }}></input>
            <div>
              <br></br>
              <input
                type="password"
                className={styles.password}
                placeholder={"Password"}
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  updatePassword(e.target.value);
                }}></input>
              <br></br>
              <input
                type="submit"
                value={"Submit"}
                className={styles.submit}></input>
              <p className={styles.Error}>{error}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LogIn;
