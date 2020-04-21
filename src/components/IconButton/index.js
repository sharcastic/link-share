import React from "react";
import { string, object, func } from "prop-types";
import clsx from "clsx";
import "../../styles/IconButton.scss";

const IconButton = ({ Icon, title, className, onClick }) => (
  <button className={clsx(className, "icon-button")} onClick={onClick}>
    <Icon title={title} />
  </button>
);

IconButton.propTypes = {
  Icon: object.isRequired,
  title: string.isRequired,
  className: string,
  onClick: func
};

IconButton.defaultProps = {
  className: "",
  onClick: () => {}
};

export default IconButton;
