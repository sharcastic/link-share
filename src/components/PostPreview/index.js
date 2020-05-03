import React, { useState } from "react";
import { func, string, node, object } from "prop-types";

import DefaultImage from "../../assets/icons/previewImgMissing.svg";
import "../../styles/PostPreview.scss";

const PostPreview = ({ onLoad, previewTop, preview, className }) => {
  const { title, description, image } = preview;
  const [imgSrc, setImgSrc] = useState(image ? image : DefaultImage);
  // const [loading, setLoading] = useState(true);
  // const onImageLoad = () => onLoad();
  return (
    <div className={`post-preview ${className}`}>
      <div className="post-preview__background" />
      <div className="post-preview__details">
        {previewTop}
        <div className="linkDetails">
          <span className="linkDetails__title">{title}</span>
          <span className="linkDetails__description">{description}</span>
        </div>
      </div>
      <img
        src={imgSrc}
        alt="backdrop"
        onLoad={onLoad}
        onError={() => setImgSrc(DefaultImage)}
      />
    </div>
  );
};

PostPreview.propTypes = {
  src: string,
  onLoad: func,
  previewTop: node,
  preview: object,
  className: string
};

PostPreview.defaultProps = {
  previewTop: null,
  onLoad: () => {},
  className: "",
  preview: {
    title: "Website Title",
    description: "Website Description",
    image: ""
  }
};

export default PostPreview;
