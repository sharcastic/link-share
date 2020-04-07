import React, { useContext, useState, useEffect } from "react";
import Button from "@atlaskit/button";
import { useMutation } from "urql";
import { callServerless } from "../../utils/network";
import { useAuth0 } from "../../utils/Auth0";
import ProfileDetailsContext from "../../context/ProfileDetailsContext/ProfileDetailsContext";
import Textbox from "../Textbox";
import {
  createPostMutation,
  updatePostMutation,
  deletePostMutation
} from "../../queries";
import LinkPreview from "../LinkPreview";
import UserPicker from "../UserPicker";

const CreatePostComponent = ({
  description: descriptionFromProps = "",
  link: linkFromProps = "",
  selectedUsers: selectedUsersFromProps = [],
  postID,
  changeEditedPost
}) => {
  const { user = {} } = useAuth0();
  const { friends } = useContext(ProfileDetailsContext);
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
      taggedUsers: selectedUsers.map(i => ({ user_id: i.id }))
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
  const getPreviewDetails = async () => {
    const response = await callServerless(linkText);
    if (response) {
      setPreview(response);
    }
  };
  const onUsersSelectedChange = users =>
    users === undefined ? setUsersSelected([]) : setUsersSelected(users);
  const onUpdatePost = () => {
    const newlyTaggedUsers = selectedUsers.map(i => i.id);
    const deletingTags = selectedUsersFromProps.reduce((acc, user) => {
      const index = newlyTaggedUsers.indexOf(user.id);
      if (index > -1) {
        newlyTaggedUsers.splice(index, 1);
        return acc;
      }
      return [...acc, user.tagId];
    }, []);
    updatePost({
      postID,
      description,
      link: linkText,
      deletingTags,
      addingTags: newlyTaggedUsers.map(i => ({ user_id: i, post_id: postID }))
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
  return (
    <div>
      <Textbox
        value={linkText}
        onChange={onLinkTextChange}
        placeholder="Type a link or paste a link"
        onBlur={getPreviewDetails}
      />
      {linkText && (
        <>
          <Textbox
            value={description}
            onChange={onDescriptionChange}
            placeholder="Say something about what you’re sharing"
          />
          {preview.responseReceived && <LinkPreview preview={preview} />}
          <UserPicker
            options={friends.map(i => ({ ...i, type: "user" }))}
            onChange={onUsersSelectedChange}
            userId={user.sub}
            value={selectedUsers}
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
        </>
      )}
    </div>
  );
};

export default CreatePostComponent;
