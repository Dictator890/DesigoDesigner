import React, { useState } from "react";
import CodePop from "../CodePop/CodePop";
import { createComponent } from "../Network/NetworkAuth";
import styles from "./ComponentScreen.module.css";
import {
  getCssProperties,
  cssDataTypes,
  componentDefaultCodeMapping,
  componentMapping,
  templateHtml,
} from "./Data";
import Input from "./Input";
import SaveComponent from "./SaveComponent/SaveComponent";

function ComponentScreen() {
  const iframeRef = React.createRef();

  const [currentiframeCode, updateiframeCode] = useState(
    new DOMParser().parseFromString(templateHtml, "text/html")
  );

  const [cssProperties, updatecssProperties] = useState({});
  const [displayCode, updateDisplayCode] = useState(false);
  const [currentComponentType, updatecurrentComponentType] = useState("");
  const [saveScreenVisible, updatesaveScreenVisible] = useState(false);

  const resetCssProperties = () => {
    updatecssProperties(getCssProperties());
  };
  const hidecssProperties = () => {
    updatecssProperties({});
  };
  const applyCsstoComponent = (property, value) => {
    currentiframeCode.getElementById("root").childNodes[0].style[
      property
    ] = value;
    if (property.toLowerCase() === "backgroundimage") {
      if (
        /[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g.test(
          value
        )
      ) {
        console.log("Inurl");
        currentiframeCode.getElementById("root").childNodes[0].style[
          property
        ] = `url(${value})`;
      } else {
        console.log(value);
        currentiframeCode.getElementById("root").childNodes[0].style[
          property
        ] = value;
      }
    }
    updateiframeCode(currentiframeCode.cloneNode(true));
    cssProperties[property].value = value;
    updatecssProperties({ ...cssProperties });
  };

  const onSelectChange = (e) => {
    e.preventDefault();
    let currentoption = e.target.value;
    updatecurrentComponentType(currentoption);
    if (currentoption && typeof currentoption === "string") {
      currentiframeCode.getElementById("root").innerHTML =
        componentDefaultCodeMapping[currentoption] || "";
      if (currentoption === "null") {
        hidecssProperties();
      } else {
        resetCssProperties();
      }
      updateiframeCode(currentiframeCode.cloneNode(true));
    }
  };

  const onSave = (componentName, code, uierrorupdate, onSucess) => {
    console.log(`Component Name:${componentName} Code:${code} UIErrorUpdate->`);
    console.log(uierrorupdate);
    if (componentName) {
      if (code) {
        createComponent(componentName, code).then((data) => {
          onSucess(data);
        });
      } else {
        uierrorupdate("Empty code not allowed");
      }
    } else {
      uierrorupdate("Component Name cannot be empty");
    }
  };
  const onSaveComponentClosed = () => {
    updatesaveScreenVisible(false);
  };
  const onSaveClicked = (e) => {
    updatesaveScreenVisible(true);
  };
  return (
    <div className={styles.ComponentScreen}>
      <CodePop
        isVisible={displayCode}
        onClose={() => {
          updateDisplayCode(false);
        }}
        parentNode={currentiframeCode.getElementById("root")}></CodePop>

      <SaveComponent
        code={currentiframeCode?.getElementById("root")?.innerHTML}
        isVisible={saveScreenVisible}
        onClose={onSaveComponentClosed}
        componentName={currentComponentType}
        onSave={onSave}></SaveComponent>

      <div className={styles.DesignArea}>
        <div className={styles.MenuBar}>
          <div className={styles.LeftMenuBar}>
            <p>Root Component:</p>
            <select onChange={onSelectChange}>
              <option value={"null"}>None</option>
              {Object.entries(componentMapping).map(([key, value]) => {
                return <option value={value}>{key}</option>;
              })}
            </select>
          </div>

          <div className={styles.RightMenuBar}>
            <button
              className={styles.button}
              onClick={(e) => {
                updateDisplayCode(true);
              }}>
              Generate Code
            </button>
            <button
              className={styles.button}
              onClick={onSaveClicked}
              style={{ backgroundColor: "var(--secondaryColor" }}>
              Save
            </button>
          </div>
        </div>

        <div className={styles.designcontainer}>
          <iframe
            ref={iframeRef}
            title={"editorArea"}
            srcDoc={currentiframeCode.documentElement.innerHTML}></iframe>
        </div>
      </div>

      {/*Right Menu Bar*/}
      <div className={styles.cssArea}>
        {Object.entries(cssProperties || {}).map(([key, value]) => {
          return (
            <div className={styles.cssContainer} key={key}>
              <p key={key}>{key}</p>
              <Input
                type={"text"}
                value={value?.value}
                onChange={(value) => {
                  applyCsstoComponent(key, value);
                }}
                isNum={value?.type === cssDataTypes.length ? true : false}
                placeholder={"None"}
                inputKey={key}></Input>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ComponentScreen;
