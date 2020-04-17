import React from "react";
import Textfield from "@atlaskit/textfield";

const Textbox = ({ value, onChange, placeholder, onBlur, onPaste, onDrop }) => {
  return (
    <Textfield
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      onPaste={onPaste}
      onDrop={onDrop}
    />
  );
};

export default Textbox;
