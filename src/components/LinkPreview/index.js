import React from "react";

const LinkPreview = ({ preview: { error, icon, title, description } }) => {
  return (
    <div>
      {error ? (
        <span>{error}</span>
      ) : (
        <div>
          <img src={icon} alt="Link Preview" />
          <span>{title}</span>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default LinkPreview;
