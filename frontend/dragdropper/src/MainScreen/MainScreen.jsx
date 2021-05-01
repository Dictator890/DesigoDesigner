import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { path } from "../App";
import { UserStorageValue } from "../DataStore/UserStore";
import styles from "./MainScreen.module.css";
import MainScreenMenuBar from "./MainScreenMenuBar/MainScreenMenuBar";
import emptyGif from "./Assets/Empty.gif";
import ComponentCard from "./ComponentCard/ComponentCard";
import { getComponents } from "../Network/NetworkAuth";

function MainScreen() {
  const [{ _, profilePicture }] = UserStorageValue();
  const [components, updateComponents] = useState([]);
  const history = useHistory();
  const onCreateComponent = () => {
    history.push(path.componentDesign);
  };
  useEffect(() => {
    getComponents().then((data) => {
      if (data) {
        updateComponents(data);
      }
    });
  }, []);
  return (
    <div className={styles.MainScreen}>
      <MainScreenMenuBar
        profileImage={profilePicture}
        onCreateComponent={onCreateComponent}></MainScreenMenuBar>

      {components.length ? (
        <div>
          <div className={styles.gap}></div>
          <div className={styles.componentHolder}>
            {components.map((value) => {
              return (
                <React.Fragment>
                  <ComponentCard
                    key={value.id}
                    id={value.id}
                    code={value.code}
                    name={value.name}
                    lastUpdated={value?.lastUpdated}></ComponentCard>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.area}>
          {" "}
          <div>
            <img
              src={emptyGif}
              className={styles.EmptyImage}
              alt="No Components"></img>
            <p className={styles.noData}>{"Nothing found"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default MainScreen;
