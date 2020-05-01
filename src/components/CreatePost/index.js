import React, { useState, useEffect } from "react";
import { bool } from "prop-types";
import clsx from "clsx";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import { callServerless } from "../../utils/network";

import { ReactComponent as DefaultPersonIcon } from "../../assets/icons/default-person.svg";

import Button from "../Button";
import TextInput from "../TextInput";
import PostPreview from "../PostPreview";
import TextArea from "../TextArea";
import Select from "../Select";
import PillLabel from "../PillLabel";
import logo from "../../assets/icons/logo.svg";

import "../../styles/CreatePost.scss";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const CreatePost = ({ specialBehaviour }) => {
  const [linkText, setLinkText] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    if (linkText) {
      disableBodyScroll();
    } else {
      setPreview({});
      enableBodyScroll();
    }
  }, [linkText]);
  const getPreviewDetails = async (text = undefined) => {
    setPreview({ responseReceived: false });
    const url = text ? text : linkText;
    const response = await callServerless([url]);
    if (response) {
      setPreview(response[url]);
    } else {
      setPreview({});
    }
  };
  const onBlur = () => getPreviewDetails();
  const onLinkTextChange = text => setLinkText(text);
  const onDescriptionChange = text => setDescription(text);
  const onCancelClick = () => {
    setLinkText("");
    setPreview({});
  };
  const onSelectedUserChange = users =>
    users === null ? setSelectedUsers([]) : setSelectedUsers(users);

  const onUserRemove = id =>
    setSelectedUsers(selectedUsers.filter(i => i.id !== id));

  return (
    <div
      className={clsx({
        createPost: true,
        "createPost--specialBehaviour": specialBehaviour,
        "createPost--specialBehaviour--showPanel": specialBehaviour && linkText
      })}
    >
      {preview.responseReceived !== undefined && (
        <div className="createPost__post-info">
          {preview.responseReceived === true ? (
            <PostPreview preview={preview} />
          ) : (
            <div className="previewLoading">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          )}
          <TextArea value={description} onChange={onDescriptionChange} />
          <span className="shareTitle">Share with others?</span>
          <div className="selected-users">
            {selectedUsers.map(i => (
              <PillLabel
                id={i.value}
                value={i.value}
                key={i.id}
                removable
                onRemove={onUserRemove}
                leftIcon={
                  <DefaultPersonIcon
                    title="Person Icon"
                    className="person-icon"
                  />
                }
              />
            ))}
          </div>
          <Select
            options={options}
            isMulti
            onChange={onSelectedUserChange}
            menuPlacement="top"
            value={selectedUsers}
            placeholder="This does not work"
          />
        </div>
      )}
      <TextInput
        value={linkText}
        onChange={onLinkTextChange}
        onBlur={onBlur}
        className="createPost__linkTextbox"
        placeholder="Type or paste a link here"
      />
      <div className="createPost__bottom">
        <Button type="plain" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button type="primary">Save Post</Button>
      </div>
    </div>
  );
};

CreatePost.propTypes = {
  specialBehaviour: bool
};

CreatePost.defaultProps = {
  specialBehaviour: false
};

//<div className="createPost__post-info__post-preview"></div>

export default CreatePost;
