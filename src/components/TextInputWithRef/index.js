import React, { forwardRef } from "react";
import { string, func, object } from "prop-types";
import "../../styles/TextInput.scss";

const TextInput = React.forwardRef(
  ({ value, className, onChange, placeholder, onBlur }, ref) => {
    const onInputChange = e => onChange(e.target.value);
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        value={value}
        className={`textInput ${className}`}
        onChange={onInputChange}
        onBlur={onBlur}
      />
    );
  }
);

TextInput.propTypes = {
  value: string.isRequired,
  className: string,
  onChange: func,
  placeholder: string,
  onBlur: func
};

TextInput.defaultProps = {
  onChange: () => {},
  className: "",
  placeholder: "",
  onBlur: () => {}
};

export default TextInput;
