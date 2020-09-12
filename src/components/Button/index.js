import React from "react";
import { node, string, func, oneOf, bool } from "prop-types";
import "../../styles/Button.scss";

const Button = ({ children, onClick, className, type, disabled }) => {
  return (
    <button className={`button button--${type} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: node.isRequired,
  onClick: func,
  className: string,
  type: oneOf(["primary", "plain"]),
  disabled: bool,
};

Button.defaultProps = {
  className: "",
  onClick: () => {},
  type: "primary",
  disabled: false,
};

export default Button;
