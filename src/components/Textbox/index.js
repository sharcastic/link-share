import React from "react";
import Textfield from "@atlaskit/textfield";

const Textbox = ({ value, onChange, placeholder, onBlur }) => {
  return (
    <Textfield
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
};

export default Textbox;
