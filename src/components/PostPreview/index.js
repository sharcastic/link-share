import React, { useState } from "react";
import { string, node, object } from "prop-types";
import clsx from "clsx";

import DefaultImage from "../../assets/icons/previewImgMissing.svg";
import "../../styles/PostPreview.scss";

const PostPreview = ({ previewTop, preview, className, linkURL }) => {
  const { title, description, image } = preview;
  const [showActualImage, setShowImage] = useState(false);
  const onImageLoad = () => setShowImage(true);
  const onAnchorClick = e => {
    if (!linkURL) {
      e.preventDefault();
    }
  };
  return (
    <div className={`post-preview ${className}`}>
      <div className="post-preview__background" />
      <div className="post-preview__details">
        {previewTop}
        <div className="linkDetails">
          <a
            href={linkURL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onAnchorClick}
            
          >
            <span className="linkDetails__title">{title}</span>
            <span className="linkDetails__description">{description}</span>
          </a>
        </div>
      </div>
      {image && (
        <img
          src={image}
          alt="backdrop"
          onLoad={onImageLoad}
          className={clsx({ hide: !showActualImage })}
        />
      )}
      {!showActualImage && <img src={DefaultImage} alt="backdrop" />}
    </div>
  );
};

PostPreview.propTypes = {
  src: string,
  previewTop: node,
  preview: object,
  className: string,
  linkURL: string
};

PostPreview.defaultProps = {
  previewTop: null,
  className: "",
  preview: {},
  linkURL: ""
};

export default PostPreview;
