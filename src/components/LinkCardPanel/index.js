import React, { useState } from "react";

import ProfileIcon from "../ProfileIcon";
import TextInput from "../TextInput";
import Button from "../Button";

import "../../styles/LinkCardPanel.scss";

const LinkCardPanel = ({ panelSelected, comments, addComment }) => {
  const [commentValue, setComment] = useState("");
  const onCommentChange = value => setComment(value);
  const onAddComment = () => {
    addComment(commentValue).then(res => {
      if (!res.error) {
        setComment("");
      }
    });
  };
  return (
    <div className="panel-content">
      {comments.length === 0 ? (
        <div>No Comments on this post!</div>
      ) : (
        comments.map(({ content, created_by: { name } }) => (
          <div className="comment-item">
            <span className="author-icon">
              <ProfileIcon className="author-icon" />
            </span>
            <div className="comment-details">
              <span className="comment-author">{name}</span>
              <span className="comment-text">{content}</span>
            </div>
          </div>
        ))
      )}
      {/* {extraPanelSelected === "comments" && "Comments Tab"}
  {extraPanelSelected === "friends" && "Friends Tab"}
  {extraPanelSelected === "tags" && "Tags Tab"} 
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
      </div> */}
      <div className="comment-textbox-container">
        <TextInput
          value={commentValue}
          placeholder="Add a comment"
          onChange={onCommentChange}
        />
        <Button onClick={onAddComment}>Comment!</Button>
      </div>
    </div>
  );
};

export default LinkCardPanel;
