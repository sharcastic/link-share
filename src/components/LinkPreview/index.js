import React from "react";
import { useQuery } from "urql";
import { trialQuery } from "../../queries";

const LinkPreview = ({ error, icon, title, description }) => {
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
