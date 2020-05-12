import React from "react";

import ProfileIcon from "../ProfileIcon";
import TextInput from "../TextInput";

import "../../styles/LinkCardPanel.scss";

const LinkCardPanel = ({ panelSelected }) => {
  return (
    <div className="panel-content">
      {/* {extraPanelSelected === "comments" && "Comments Tab"}
  {extraPanelSelected === "friends" && "Friends Tab"}
  {extraPanelSelected === "tags" && "Tags Tab"} */}
      <div className="comment-item">
        <ProfileIcon className="author-icon" />
        <div className="comment-details">
          <span className="comment-author">Friend name</span>
          <span className="comment-text">Comment content!</span>
        </div>
      </div>
      <div className="comment-item">
        <span className="author-icon">
          <ProfileIcon className="author-icon" />
        </span>
        <div className="comment-details">
          <span className="comment-author">Fricken Chicken</span>
          <span className="comment-text">
            This another comment to add to the previous one. This can be a
            longer comment, and that’s ok. Because we can handle it.
          </span>
        </div>
      </div>
      <div className="comment-item">
        <span className="author-icon">
          <ProfileIcon className="author-icon" />
        </span>
        <div className="comment-details">
          <span className="comment-author">Fricken Chicken</span>
          <span className="comment-text">
            This another comment to add to the previous one. This can be a
            longer comment, and that’s ok. Because we can handle it.
          </span>
        </div>
      </div>
      <div className="comment-item">
        <span className="author-icon">
          <ProfileIcon className="author-icon" />
        </span>
        <div className="comment-details">
          <span className="comment-author">Fricken Chicken</span>
          <span className="comment-text">
            This another comment to add to the previous one. This can be a
            longer comment, and that’s ok. Because we can handle it.
          </span>
        </div>
      </div>
      <TextInput value="" placeholder="Add a comment" />
    </div>
  );
};

export default LinkCardPanel;
