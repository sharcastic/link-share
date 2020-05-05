import React, { useState } from "react";
import { func, string, node, object } from "prop-types";

import DefaultImage from "../../assets/icons/previewImgMissing.svg";
import "../../styles/PostPreview.scss";

const PostPreview = ({ onLoad, previewTop, preview, className, linkURL }) => {
  const { title, description, image } = preview;
  const [imgSrc, setImgSrc] = useState(image ? image : DefaultImage);
  // const [loading, setLoading] = useState(true);
  // const onImageLoad = () => onLoad();
  const LinkTitleAndDescription = () => (
    <>
      <span className="linkDetails__title">{title}</span>
      <span className="linkDetails__description">{description}</span>
    </>
  );
  return (
    <div className={`post-preview ${className}`}>
      <div className="post-preview__background" />
      <div className="post-preview__details">
        {previewTop}
        <div className="linkDetails">
          {linkURL ? (
            <a href={linkURL} target="_blank" rel="noopener noreferrer">
              <LinkTitleAndDescription />
            </a>
          ) : (
            <LinkTitleAndDescription />
          )}
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
  className: string,
  linkURL: string
};

PostPreview.defaultProps = {
  previewTop: null,
  onLoad: () => {},
  className: "",
  preview: {
    title: "Website Title",
    description: "Website Description",
    image: ""
  },
  linkURL: ""
};

export default PostPreview;
