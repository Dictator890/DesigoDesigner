import React, { useState } from "react";
import styles from "./SignUp.module.css";
import uploadPhoto from "./Assets/uploadphoto.svg";
import { createNewUser } from "../Network/NetworkAuth";
import loginImage from "./Assets/LoginImage.svg";

function SignUp({ onSucess }) {
  const [error, updateError] = useState("");
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [file, updateFile] = useState();
  const fileInputRef = React.createRef();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result;
          createNewUser(username, password, result)
            .then(onSucess)
            .catch(onFailure);
        };
        reader.onerror = () => {
          updateError("Error occured while processing the image");
        };
      } else {
        createNewUser(username, password, null).then(onSucess).catch(onFailure);
      }
    } else {
      updateError("Unable to create a new user");
    }
  };

  const onFailure = (err) => {
    updateError(err.toString());
  };
  return (
    <div className={styles.SignUp}>
      <div className={styles.imageContainer}>
        <img src={loginImage} alt={"SignUp Image"}></img>
      </div>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit(e);
          }}>
          <h1 className={styles.title}>Sign Up</h1>
          <div
            className={styles.uploadPhoto}
            onClick={(e) => {
              fileInputRef.current.click();
            }}>
            <img src={uploadPhoto} alt={"Upload"}></img>
            <p> Profile Picture</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            accept="image/jpeg,image/png"
            onChange={(e) => {
              updateFile(e.target.files[0]);
            }}></input>
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
export default SignUp;
