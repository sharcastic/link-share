import React from "react";
import { string, object, bool } from "prop-types";
import clsx from "clsx";
import "../../styles/IconButton.scss";

const IconButton = ({ Icon, title, className, unreadIndicator }) => (
  <button className={clsx(className, "icon-button")}>
    <Icon title={title} />
    {unreadIndicator && <span className="icon-button__unreadIndicator" />}
  </button>
);

IconButton.propTypes = {
  Icon: object.isRequired,
  title: string.isRequired,
  className: string,
  unreadIndicator: bool
};

IconButton.defaultProps = {
  className: "",
  unreadIndicator: true
};

export default IconButton;
