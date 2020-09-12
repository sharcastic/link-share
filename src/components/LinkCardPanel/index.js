import React, { useState } from "react";

import ProfileIcon from "../ProfileIcon";
import TextInput from "../TextInput";
import Button from "../Button";

import "../../styles/LinkCardPanel.scss";

const LinkCardPanel = ({
  panelSelected,
  comments = [],
  addComment,
  tags = [],
  users = [],
}) => {
  const [commentValue, setComment] = useState("");
  const onCommentChange = (value) => setComment(value);
  const onAddComment = () => {
    /* addComment(commentValue).then((res) => {
      if (!res.error) {
        setComment("");
      }
    }); */
    console.log(!commentValue);
  };
  console.log()
  if (panelSelected === "comments") {
    return (
      <div className="panel-content">
        {comments.length === 0 ? (
          <div>No Comments on this post!</div>
        ) : (
          comments.map(({ content, created_by: { name }, id }) => (
            <div className="comment-item" key={id}>
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
        <div className="comment-textbox-container">
          <TextInput
            value={commentValue}
            placeholder="Add a comment"
            onChange={onCommentChange}
          />
          <Button disabled={!commentValue} onClick={onAddComment}>Comment!</Button>
        </div>
      </div>
    );
  } else if (panelSelected === "tags") {
    return (
      <div className="panel-content">
        {tags.length === 0 ? (
          <div>This post doesn't have tags!</div>
        ) : (
          <div>Tags are present!</div>
        )}
      </div>
    );
  } else if (panelSelected === "friends") {
    return (
      <div className="panel-content">
        {users.length === 0 ? (
          <div>No tagged users in this post!</div>
        ) : (
          users.map(({ user: { id, name, display_picture_url } }) => (
            <div className="user-tag-item" key={id}>
              <span className="user-tag-icon">
                <ProfileIcon
                  className="user-tag-icon"
                  img={display_picture_url}
                />
              </span>
              <div className="user-tag-details">
                <span className="user-tag-name">{name}</span>
              </div>
            </div>
          ))
        )}
      </div>
    );
  } else {
    return <div>Lol!</div>;
  }
};

export default LinkCardPanel;
