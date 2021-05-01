import React, { useEffect } from "react";
import styles from "./CodeDisplay.module.css";
import PropTypes from "prop-types";
import Prism from "prismjs";
import "./prism.css";
function CodeDisplay({ code }) {
  useEffect(() => {
    console.log(code);
    Prism.highlightAll();
  }, [code]);
  const split_code = (code) => {
    if (code) {
      var regex = /(<|>){1}/g;
      const new_str = code.split(regex);
      var final_code = "";
      if (new_str) {
        new_str.forEach((value) => {
          switch (value) {
            case "<":
              final_code = final_code + "\n" + value;
              break;
            case ">":
              final_code = final_code + value + "\n";
              break;
            case " ":
              break;
            default:
              final_code += value;
          }
        });
        final_code = final_code.trimStart();
        return final_code;
      }
    }
  };

  return (
    <div className={styles.root}>
      <pre className="line-numbers">
        <code className="language-markup">{split_code(code)}</code>
      </pre>
    </div>
  );
}
CodeDisplay.propTypes = {
  code: PropTypes.string,
};
export default CodeDisplay;
