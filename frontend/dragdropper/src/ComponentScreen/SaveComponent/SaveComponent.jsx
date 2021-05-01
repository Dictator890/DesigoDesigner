import React, { useEffect, useState } from "react";
import styles from "./SaveComponent.module.css";
import PropTypes from "prop-types";

import CodeDisplay from "../../CodeDisplay/CodeDisplay";
function SaveComponent({ code, onClose, isVisible, onSave }) {
  const [inputField, updateinputField] = useState("");
  const [error, updateError] = useState("");
  const [sucess, updateSucess] = useState("");
  const onBack = (e) => {
    if (typeof onClose === "function") {
      onClose();
    }
  };
  const onSaveClicked = (e) => {
    if (typeof onSave === "function") {
      onSave(inputField, code, updateError, onClose);
      onClose();
    }
  };
  useEffect(() => {
    updateError("");
  }, [inputField, code]);
  return (
    <React.Fragment>
      <div
        className={styles.root}
        style={{ display: isVisible ? "block" : "none" }}>
        <h1 style={{ textAlign: "center", marginTop: "10px" }}>
          Save Component
        </h1>
        <div className={styles.internalContainer}>
          <div className={styles.LeftContainer}>
            <CodeDisplay code={code}></CodeDisplay>
            <iframe srcDoc={code}></iframe>
          </div>
          <div className={styles.RightContainer}>
            <div className={styles.form}>
              <input
                type="text"
                placeholder={"Component Name"}
                className={styles.input}
                value={inputField}
                onChange={(e) => {
                  updateinputField(e.target.value);
                }}></input>
              <div className={styles.gap}></div>
              <h2 className={styles.error}>{error}</h2>
              <h2 className={styles.error}>{sucess}</h2>
              <div className={styles.gap}></div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button + " " + styles.red}
                  onClick={onBack}>
                  Go Back
                </button>
                <button
                  className={styles.button + " " + styles.orange}
                  onClick={onSaveClicked}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
SaveComponent.propTypes = {
  code: PropTypes.string,
  onClose: PropTypes.func,
};

export default SaveComponent;
