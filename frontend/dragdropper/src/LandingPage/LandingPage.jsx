import styles from "./LandingPage.module.css";
import React from "react";
import LandingMenuBar from "./LandingMenuBar/LandingMenuBar";
import Home from "./SubMenus/Home";

function LandingPage({ onLogIn, onSignUp, match }) {
  return (
    <div className={styles.LandingPage}>
      <LandingMenuBar onLogIn={onLogIn} onSignUp={onSignUp}></LandingMenuBar>
      <Home></Home>
    </div>
  );
}
export default LandingPage;
