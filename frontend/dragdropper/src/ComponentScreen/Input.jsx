import React from "react";

function Input({ isNum, inputKey, onEnterPressed, value, onChange }) {
  return (
    <input
      onKeyUp={(e) => {
        e.preventDefault();
        if (onEnterPressed) {
          if (e.code === "Enter") {
            onEnterPressed(value);
          }
        }
      }}
      placeholder={isNum ? "0px" : "None"}
      value={value || ""}
      type="text"
      onChange={(e) => {
        onChange(e.target.value);
      }}></input>
  );
}
export default Input;
