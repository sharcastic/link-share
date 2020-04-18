import React from "react";
import { string, object } from "prop-types";
import clsx from "clsx";
import "../../styles/IconButton.scss";

const IconButton = ({ Icon, title, className }) => (
  <button className={clsx(className, "icon-button")}>
    <Icon title={title} />
  </button>
);

IconButton.propTypes = {
  Icon: object.isRequired,
  title: string.isRequired,
  className: string
};

IconButton.defaultProps = {
  className: ""
};

export default IconButton;
