import React from "react";
import styles from "./MainScreenMenuBar.module.css";
import blankProfile from "./Assets/Images/blankprofile.svg";
import designImage from "./Assets/Images/design.svg";
function MainScreenMenuBar({ profileImage, onCreateComponent }) {
  return (
    <div className={styles.MainScreenMenuBar}>
      <div className={styles.LeftBar}></div>
      <div className={styles.RightBar}>
        <img
          src={profileImage || blankProfile}
          className={styles.profileImage}
          alt={"Profile"}></img>
        <div className={styles.break}></div>
        <img
          src={designImage}
          className={styles.profileImage}
          style={{ borderRadius: "0" }}
          alt={"Create Component"}
          onClick={(e) => {
            e.preventDefault();
            if (typeof onCreateComponent === "function") {
              onCreateComponent();
            }
          }}></img>
        <div className={styles.break}></div>
      </div>
    </div>
  );
}
export default MainScreenMenuBar;
