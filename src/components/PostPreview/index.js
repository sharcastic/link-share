import React, { useState } from "react";
import clsx from "clsx";
import { func, string, node, object } from "prop-types";

import DefaultImage from "../../assets/icons/previewImgMissing.svg";
import "../../styles/PostPreview.scss";

const PostPreview = ({ onLoad, previewTop, preview }) => {
  const { title, description, image } = preview;
  const [imgSrc, setImgSrc] = useState(image ? image : DefaultImage);
  const [loading, setLoading] = useState(true);
  const onImageLoad = () => onLoad();
  return (
    <div className="post-preview">
      <div className="post-preview__background" />
      <div className="post-preview__details">
        {previewTop}
        <div className="post-preview__details__linkDetails">
          <span className="post-preview__details__linkDetails__title">
            {title}
          </span>
          <span className="post-preview__details__linkDetails__description">
            {description}
          </span>
        </div>
      </div>
      <img
        src={imgSrc}
        alt="backdrop"
        onLoad={onImageLoad}
        onError={() => setImgSrc(DefaultImage)}
        className={clsx({ hide: loading, "post-preview__image": true })}
      />
    </div>
  );
};

PostPreview.propTypes = {
  src: string,
  onLoad: func,
  previewTop: node,
  preview: object
};

PostPreview.defaultProps = {
  previewTop: null,
  onLoad: () => {},
  preview: {
    title: "Website Title",
    description: "Website Description",
    image: ""
  }
};

export default PostPreview;
