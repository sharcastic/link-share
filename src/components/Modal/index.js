import React from "react";
import { func } from "prop-types";
import { motion } from "framer-motion";

import "../../styles/Modal.scss";

const Modal = ({ onCloseClick, children }) => (
  <motion.div 
    animate={{ scale: 1.25 }}
    transition={{ duration: 0.3 }}  
    className="modal-container">
    <div className="modal-content">
    <span className="close-modal" onClick={onCloseClick}>
        Close [X]
      </span>
      {children}
    </div>
  </motion.div>
);

Modal.propTypes = {
  onCloseClick: func
};

Modal.defaultProps = {
  onCloseClick: () => {}
};

export default Modal;
