import React from "react";
import { string, func, bool, node } from "prop-types";

import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

import "../../styles/PillLabel.scss";

const PillLabel = ({ value, id, onRemove, className, removable, leftIcon }) => {
  const onRemoveClick = () => onRemove(id);
  return (
    <div className={`pill-label ${className}`}>
      {leftIcon}
      <span className="pill-label--text">{value}</span>
      {removable && (
        <CloseIcon
          title="remove icon"
          className="pill-label--remove"
          onClick={onRemoveClick}
        />
      )}
    </div>
  );
};

PillLabel.propTypes = {
  value: string.isRequired,
  id: string.isRequired,
  onRemove: func,
  className: string,
  removable: bool,
  leftIcon: node
};

PillLabel.defaultProps = {
  className: "",
  onRemove: () => {},
  removable: false,
  leftIcon: null
};

export default PillLabel;
