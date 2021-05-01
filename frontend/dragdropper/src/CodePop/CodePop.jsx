import React, { useEffect, useState } from "react";
import styles from "./CodePop.module.css";
import closeSvg from "./Assets/close.svg";
import downloadSvg from "./Assets/download.svg";
import "./prism.css";
import CodeDisplay from "../CodeDisplay/CodeDisplay";

function CodePop({ isVisible, parentNode, onClose }) {
  const aRef = React.createRef();
  const [code, updateCode] = useState("");
  useEffect(() => {
    updateCode(parentNode?.innerHTML, "");
  }, [parentNode]);

  return (
    <div
      className={styles.root}
      style={{ display: isVisible ? "block" : "none" }}>
      <div className={styles.container}>
        <div className={styles.MenuBar}>
          <img
            src={closeSvg}
            alt={"Close"}
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              if (typeof onClose === "function") {
                onClose();
              }
            }}></img>

          <img
            src={downloadSvg}
            alt={"Close"}
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();

              if (aRef && code) {
                aRef.current.setAttribute("download", "index.html");
                aRef.current.href = `data:text/html;charset=utf-8,${encodeURIComponent(
                  code
                )}`;
                aRef.current.click();
              }
            }}></img>
          <a href={"#"} ref={aRef} style={{ display: "none" }}>
            Lol
          </a>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.codeTop}>
            <CodeDisplay code={code}></CodeDisplay>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CodePop;
