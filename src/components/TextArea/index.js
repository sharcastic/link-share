import React from "react";
import { string, func } from "prop-types";

import "../../styles/TextArea.scss";

const TextArea = ({ value, onChange }) => {
  const onTextAreaChange = e => onChange(e.target.value);
  return (
    <div className="textarea-container">
      <textarea
        className="textarea"
        rows="3"
        maxlength="100"
        placeholder="Type a title or description for the link you are sharing"
        value={value}
        onChange={onTextAreaChange}
      />
      <span className="character-count">{`${value.length}/100`}</span>
    </div>
  );
};

TextArea.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired
};

export default TextArea;
