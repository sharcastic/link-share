import React from "react";
import { func } from "prop-types";

import "../../styles/Modal.scss";

const Modal = ({ onCloseClick, children }) => (
  <div className="modal-container">
    <div className="modal-content">
      {children}
      <span className="close" onClick={onCloseClick}>
        Close [X]
      </span>
    </div>
  </div>
);

Modal.propTypes = {
  onCloseClick: func
};

Modal.defaultProps = {
  onCloseClick: () => {}
};

export default Modal;
