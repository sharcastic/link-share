import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import ApplicationContext from "../../context/ApplicationContext/ApplicationContext";
import { callServerless } from "../../utils/network";
import { selectComponentSerializer } from "../../utils/methods";

import { ReactComponent as DefaultPersonIcon } from "../../assets/icons/default-person.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

import Button from "../Button";
import TextInput from "../TextInput";
import PostPreview from "../PostPreview";
import TextArea from "../TextArea";
import Select from "../Select";
import PillLabel from "../PillLabel";
import logo from "../../assets/icons/logo.svg";

import "../../styles/CreatePost.scss";

const CreatePost = () => {
  const {
    editingPost,
    changeEditingPost,
    showHomeTextInput,
    setShowTextInputValue,
    connections: connectionsArr,
    createPost,
    updatePost
  } = useContext(ApplicationContext);
  const [linkText, setLinkText] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState({});
  const [connections, setConnections] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    if (linkText) {
      disableBodyScroll();
    } else {
      setPreview({});
      enableBodyScroll();
    }
  }, [linkText]);
  useEffect(() => {
    if (editingPost) {
      setLinkText(editingPost.link);
      setDescription(editingPost.description);
      getPreviewDetails(editingPost.link);
      setSelectedUsers(
        editingPost.post_tagged_users.map(({ user }) =>
          selectComponentSerializer(user)
        )
      );
    }
  }, [editingPost]);
  useEffect(() => {
    setConnections(
      connectionsArr.map(({ user_connected }) =>
        selectComponentSerializer(user_connected)
      )
    );
  }, [connectionsArr]);
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
    if (editingPost) {
      changeEditingPost();
    }
    setLinkText("");
    setPreview({});
    setSelectedUsers([]);
    setShowTextInputValue(false);
  };
  const onCreatePost = () => {
    let promise;
    if (editingPost) {
      const newlyTaggedUsers = selectedUsers.map(i => i.id);
      const removedUsers = editingPost.post_tagged_users.reduce(
        (acc, { user }) => {
          const index = newlyTaggedUsers.indexOf(user.id);
          if (index > -1) {
            newlyTaggedUsers.splice(index, 1);
            return acc;
          }
          return [...acc, user.id];
        },
        []
      );
      promise = updatePost(
        description,
        linkText,
        newlyTaggedUsers,
        removedUsers
      );
    } else {
      promise = createPost(description, linkText, selectedUsers);
    }
    promise.then(res => {
      if (!res.error) {
        setLinkText("");
        setPreview({});
        setSelectedUsers([]);
      }
    });
  };
  const onSelectedUserChange = users =>
    users === null ? setSelectedUsers([]) : setSelectedUsers(users);

  const onUserRemove = id =>
    setSelectedUsers(selectedUsers.filter(i => i.id !== id));

  return (
    <div
      className={clsx({
        createPost: true,
        "createPost--showPanel": !!linkText
      })}
    >
      <div
        className={clsx({ addPostButton: true, hide: showHomeTextInput })}
        onClick={() => setShowTextInputValue(true)}
      >
        <AddIcon title="Add Icon" />
      </div>
      {preview.responseReceived !== undefined && (
        <div
          className={clsx({
            "createPost__post-info": true,
            hide: !!linkText && preview.responseReceived === undefined
          })}
        >
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
                id={i.id}
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
            options={connections}
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
        className={clsx({
          createPost__linkTextbox: true,
          // hide: !showHomeTextInput && !showTextInputOverride
          hide: !showHomeTextInput
        })}
        placeholder="Type or paste a link here"
      />
      <div className="createPost__bottom">
        <Button type="plain" onClick={onCancelClick}>
          Cancel
        </Button>
        <Button type="primary" onClick={onCreatePost}>
          Save Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
