import React from "react";
import { node, string, func, oneOf } from "prop-types";
import "../../styles/Button.scss";

const Button = ({ children, onClick, className, type }) => {
  return (
    <button className={`button button--${type} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: node.isRequired,
  onClick: func,
  className: string,
  type: oneOf(["primary", "plain"])
};

Button.defaultProps = {
  className: "",
  onClick: () => {},
  type: "primary"
};

export default Button;
