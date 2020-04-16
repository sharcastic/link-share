import React from "react";

const LinkPreview = ({
  preview: { error, image, title, description, responseReceived }
}) => {
  if (responseReceived === undefined) {
    return null;
  }
  if (responseReceived === false) {
    return <div>Loading Preview!</div>;
  }
  return (
    <div>
      {error ? (
        <span>{error}</span>
      ) : (
        <div>
          <img src={image} alt="Link Preview" />
          <span>{title}</span>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default LinkPreview;
