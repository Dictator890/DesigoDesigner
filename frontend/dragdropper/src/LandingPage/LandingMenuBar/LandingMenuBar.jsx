import styles from "./LandingMenuBar.module.css";
import React from "react";
function LandingMenuBar({ onLogIn, onSignUp }) {
  return (
    <div className={styles.LandingMenuBar}>
      <div></div>
      <div className={styles.OptionContainer}>
        <p
          className={styles.Option + " " + styles.SignIn}
          onClick={(e) => {
            e.preventDefault();
            if (typeof onLogIn === "function") {
              onLogIn();
            }
          }}>
          Log In
        </p>
        <p
          className={styles.Option + " " + styles.SignIn}
          onClick={(e) => {
            e.preventDefault();
            if (typeof onSignUp === "function") {
              onSignUp();
            }
          }}
          style={{ backgroundColor: "var(--secondaryColor)" }}>
          Sign Up
        </p>
      </div>
    </div>
  );
}
export default LandingMenuBar;
