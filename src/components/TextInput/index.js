import React from "react";
import { string, func } from "prop-types";
import "../../styles/TextInput.scss";

const TextInput = ({ value, className, onChange, placeholder }) => {
  const onInputChange = e => onChange(e.target.value);
  return (
    <input
      placeholder={placeholder}
      value={value}
      className={`textInput ${className}`}
      onChange={onInputChange}
    />
  );
};

TextInput.propTypes = {
  value: string.isRequired,
  className: string,
  onChange: func,
  placeholder: string
};

TextInput.defaultProps = {
  onChange: () => {},
  className: "",
  placeholder: ""
};

export default TextInput;
