import React from "react";
import { func, string, node } from "prop-types";
import "../../styles/PostPreview.scss";

const PostPreview = ({ src, onLoad, previewTop }) => {
  return (
    <div className="post-preview">
      <div className="post-preview__background" />
      <div className="post-preview__details">
        {previewTop}
        <div className="post-preview__details__linkDetails">
          <span className="post-preview__details__linkDetails__title">
            Website Title
          </span>
          <span className="post-preview__details_linkDetails__description">
            Website Description
          </span>
        </div>
      </div>
      <img src={src} alt="backdrop" onLoad={onLoad} />
    </div>
  );
};

PostPreview.propTypes = {
  src: string.isRequired,
  onLoad: func,
  previewTop: node
};

PostPreview.defaultProps = {
  previewTop: null,
  onLoad: () => {}
};

export default PostPreview;
