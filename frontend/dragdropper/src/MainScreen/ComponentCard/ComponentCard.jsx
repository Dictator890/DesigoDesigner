import React, { useEffect, useState } from "react";
import styles from "./ComponentCard.module.css";
import lastupdatedIcon from "./Assets/lastupdated.svg";
import opencodeIcon from "./Assets/coding.svg";
import CodePop from "../../CodePop/CodePop";

function ComponentCard({ code, id, lastUpdated, name }) {
  const templateHtml =
    "<!DOCTYPE html><html><head><style></style></head> <body style='border:0;margin:0;padding:0;' ><div id='root' style='width:100vw;height:100vh; display:flex;align-items:center;justify-content:center;'></div></body></html>";
  const [displayCode, updateDisplayCode] = useState();
  const [isPopVisible, updateisPopVisible] = useState(false);
  useEffect(() => {
    if (code) {
      var parser = new DOMParser().parseFromString(templateHtml, "text/html");
      parser.getElementById("root").innerHTML = code;
      updateDisplayCode(parser);
    }
  }, [code]);
  const onViewClicked = (e) => {
    e?.preventDefault();
    updateisPopVisible(!isPopVisible);
  };
  return (
    <React.Fragment>
      <CodePop
        isVisible={isPopVisible}
        parentNode={displayCode?.getElementById("root")}
        onClose={onViewClicked}></CodePop>
      <div className={styles.card}>
        <div className={styles.topContainer}>
          <iframe
            srcDoc={displayCode?.documentElement.innerHTML}
            title={id + "_iframe"}>
            <p>Cannot display</p>
          </iframe>
        </div>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.timeDisplayContainer}>
          <img src={lastupdatedIcon} alt={"Last Updated info"}></img>

          <p>{lastUpdated ? new Date(lastUpdated).toString() : "?"}</p>
        </div>
        <div className={styles.code}>
          <img
            src={opencodeIcon}
            alt={"Last Updated info"}
            onClick={onViewClicked}></img>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ComponentCard;
