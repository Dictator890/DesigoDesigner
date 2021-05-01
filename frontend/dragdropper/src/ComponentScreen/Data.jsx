const cssDataTypes = {
  length: 0,
  color: 1,
  string: 2,
};

const getCssProperties = () => {
  return {
    borderRadius: { value: 0, type: cssDataTypes.length },
    borderWidth: { value: 0, type: cssDataTypes.length },
    width: { value: 0, type: cssDataTypes.length },
    height: { value: 0, type: cssDataTypes.length },
    backgroundColor: { value: "", type: cssDataTypes.color },
    minWidth: { value: 0, type: cssDataTypes.length },
    borderStyle: {
      value: "",
      type: cssDataTypes.string,
    },
    backgroundImage: {
      value: "",
      type: cssDataTypes.string,
    },
    backgroundPosition: { value: "", type: cssDataTypes.string },
    border: { value: "", type: cssDataTypes.string },
    borderBottom: { value: "", type: cssDataTypes.string },
    borderBottomColor: { value: "", type: cssDataTypes.color },
    color: { value: "", type: cssDataTypes.color },
  };
};
const componentMapping = {
  button: "button",
  checkbox: "checkbox",
  div: "div",
  label: "label",
  select: "select",
  p: "p",
};

const componentDefaultCodeMapping = {
  button: `<button id='${componentMapping.button}'>Button</button`,
  checkbox: `<input type='checkbox' id=${componentMapping.checkbox} />`,
  div: `<div id=${componentMapping.div} ></div>`,
  select: `<select id=${componentMapping.select}> <option>Default</option><option>Default</option><option>Default</option></select>`,
  p: `<p id=${componentMapping.p}>Default Text</p>`,
  label: `<label id=${componentMapping.label}>A Label</label>`,
};
const templateHtml =
  "<!DOCTYPE html><html><head><style></style></head> <body style='border:0;margin:0;padding:0;' ><div id='root' style='width:100vw;height:100vh; display:flex;align-items:center;justify-content:center;background-color:#fff;'></div></body></html>";

export {
  getCssProperties,
  cssDataTypes,
  componentDefaultCodeMapping,
  componentMapping,
  templateHtml,
};
