import React, { useContext, useState, useEffect, lazy, Suspense } from "react";
import Button from "@atlaskit/button";
import { useMutation } from "urql";
import { callServerless } from "../../utils/network";
import { useAuth0 } from "../../utils/Auth0";
import ProfileDetailsContext from "../../context/ProfileDetailsContext/ProfileDetailsContext";
import Textbox from "../Textbox";
import Select from "../Select";
import {
  createPostMutation,
  updatePostMutation,
  deletePostMutation
} from "../../queries";
import LinkPreview from "../LinkPreview";

const CreatePostComponent = ({
  description: descriptionFromProps = "",
  link: linkFromProps = "",
  selectedUsers: selectedUsersFromProps = [],
  postID,
  changeEditedPost
}) => {
  const { user = {} } = useAuth0();
  const { connections } = useContext(ProfileDetailsContext);
  const [preview, setPreview] = useState({});
  const [linkText, setLinkText] = useState(linkFromProps);
  const [description, setDescription] = useState(descriptionFromProps);
  const [selectedUsers, setUsersSelected] = useState(selectedUsersFromProps);
  const [createPostResult, createPost] = useMutation(createPostMutation);
  const [updatePostResult, updatePost] = useMutation(updatePostMutation);
  const [deletePostResult, deletePost] = useMutation(deletePostMutation);
  useEffect(() => {
    if (postID !== undefined) {
      getPreviewDetails();
    }
  }, []);
  useEffect(() => {
    if (!linkText) {
      setPreview({});
    }
  }, [linkText]);
  const onCreatePost = () => {
    createPost({
      userId: user.sub,
      description,
      link: linkText,
      taggedUsers: selectedUsers.map(i => ({ user_id: i.id })),
      notifications: selectedUsers.map(i => ({
        targeted_user_id: i.id,
        status: "UNREAD",
        type: "TAGGED_POST",
        created_by_id: user.sub
      }))
    }).then(res => {
      if (!res.error) {
        setLinkText("");
        setDescription("");
        onUsersSelectedChange();
      }
    });
  };
  const onLinkTextChange = e => setLinkText(e.target.value);
  const onDescriptionChange = e => setDescription(e.target.value);
  const getPreviewDetails = async (text = undefined) => {
    setPreview({ responseReceived: false });
    const response = await callServerless(text ? text : linkText);
    if (response) {
      setPreview(response);
    }
  };
  const onUsersSelectedChange = users =>
    users === null ? setUsersSelected([]) : setUsersSelected(users);
  const onUpdatePost = () => {
    const newlyTaggedUsers = selectedUsers.map(i => i.id);
    const removedUsers = selectedUsersFromProps.reduce((acc, user) => {
      const index = newlyTaggedUsers.indexOf(user.id);
      if (index > -1) {
        newlyTaggedUsers.splice(index, 1);
        return acc;
      }
      return [...acc, user.id];
    }, []);
    updatePost({
      postID,
      description,
      link: linkText,
      removedUsers,
      addingTags: newlyTaggedUsers.map(i => ({ user_id: i, post_id: postID })),
      addNotifications: newlyTaggedUsers.map(i => ({
        targeted_user_id: i,
        status: "UNREAD",
        type: "TAGGED_POST",
        created_by_id: user.sub,
        content_id: postID
      }))
    }).then(res => {
      if (!res.error) {
        changeEditedPost();
      }
    });
  };
  const onDeletePost = () => {
    deletePost({ postID }).then(res => {
      if (!res.error) {
        changeEditedPost();
      }
    });
  };
  const options = connections.map(i => ({ ...i, value: i.id, label: i.name }));
  const defaultOptions = selectedUsersFromProps.map(i => ({
    ...i,
    value: i.id,
    label: i.name
  }));
  const onCustomInputEvent = type => event => {
    console.log("TYPE", type);
    console.log("EVENT", event);
    const text =
      type === "paste"
        ? event.clipboardData.getData("text")
        : event.dataTransfer.getData("text");
    setLinkText(text);
    event.preventDefault();
    getPreviewDetails(text);
  };
  return (
    <div data-testid="CreatePost">
      <Textbox
        value={linkText}
        onChange={onLinkTextChange}
        placeholder="Type a link or paste a link"
        onBlur={() => getPreviewDetails()}
        onPaste={onCustomInputEvent("paste")}
        onDrop={onCustomInputEvent("drop")}
      />
      {linkText && (
        <Suspense fallback={<div>Loading CreatePost Components</div>}>
          <Textbox
            value={description}
            onChange={onDescriptionChange}
            placeholder="Say something about what you’re sharing"
          />
          <LinkPreview preview={preview} />
          <Select
            options={options}
            isMulti
            onChange={onUsersSelectedChange}
            selectedOptions={defaultOptions}
          />
          {postID !== undefined ? (
            <div>
              <Button
                appearance="primary"
                onClick={onUpdatePost}
                isLoading={updatePostResult.fetching}
                isDisabled={updatePostResult.fetching === true}
              >
                Update Post
              </Button>
              <Button appearance="warning" onClick={() => changeEditedPost()}>
                Cancel Editing Post
              </Button>
              <Button
                appearance="danger"
                onClick={onDeletePost}
                isLoading={deletePostResult.fetching}
                isDisabled={deletePostResult.fetching === true}
              >
                Delete Post
              </Button>
            </div>
          ) : (
            <Button
              isLoading={createPostResult.fetching}
              isDisabled={createPostResult.fetching === true}
              appearance="primary"
              onClick={onCreatePost}
            >
              {selectedUsers.length === 0 ? "Save Link" : "Share Link"}
            </Button>
          )}
        </Suspense>
      )}
    </div>
  );
};

export default CreatePostComponent;
