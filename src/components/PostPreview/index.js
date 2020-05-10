import React, { useState, useEffect } from "react";
import { func, string, node, object, bool } from "prop-types";

import DefaultImage from "../../assets/icons/previewImgMissing.svg";
import "../../styles/PostPreview.scss";

const PostPreview = ({
  onLoad,
  previewTop,
  preview,
  className,
  linkURL,
  initialLoad
}) => {
  const { title, description } = preview;
  const [imgSrc, setImgSrc] = useState(DefaultImage);

  useEffect(() => {
    const { image } = preview;
    if (initialLoad || !image) {
      setImgSrc(DefaultImage);
    } else {
      setImgSrc(image);
    }
  }, [preview]);
  const LinkTitleAndDescription = () => (
    <>
      <span className="linkDetails__title">{title}</span>
      <span className="linkDetails__description">{description}</span>
    </>
  );
  const onImageLoad = () => {
    if (!initialLoad) {
      onLoad();
    }
  };
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
        onLoad={onImageLoad}
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
  linkURL: string,
  initialLoad: bool
};

PostPreview.defaultProps = {
  previewTop: null,
  onLoad: () => {},
  className: "",
  preview: {},
  linkURL: "",
  initialLoad: false
};

export default PostPreview;
