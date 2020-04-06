import React from "react";
import Button from "@atlaskit/button";
import { useMutation } from "urql";
import Textbox from "../Textbox";
import { createPostMutation } from "../../queries";
import LinkPreview from "../LinkPreview";
import UserPicker from "../UserPicker";

const CreatePostComponent = ({
  description,
  onDescriptionChange,
  selectedUsers,
  preview,
  friends,
  user,
  linkText,
  onLinkTextChange,
  onLinkTextBlur,
  onUsersSelectedChange
}) => {
  const [createPostResult, createPost] = useMutation(createPostMutation);
  const onCreatePost = () => {
    createPost({
      userId: user.sub,
      description,
      link: linkText,
      taggedUsers: selectedUsers.map(i => ({ user_id: i.id }))
    }).then(res => {
      if (!res.error) {
        onDescriptionChange("");
        onLinkTextChange("");
        onUsersSelectedChange();
      }
    });
  }; // $userId: String!, $description: String!, $link: String
  return (
    <div>
      <Textbox
        value={linkText}
        onChange={e => onLinkTextChange(e.target.value)}
        placeholder="Type a link or paste a link"
        onBlur={onLinkTextBlur}
      />
      {linkText && (
        <>
          <Textbox
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
            placeholder="Say something about what you’re sharing"
          />
          {preview.responseReceived && (
            <LinkPreview
              error={preview.error}
              description={preview.description}
              icon={preview.icon}
              title={preview.title}
            />
          )}
          <UserPicker
            options={friends}
            onChange={onUsersSelectedChange}
            userId={user.sub}
            value={selectedUsers}
          />
          <Button
            isLoading={createPostResult.fetching}
            isDisabled={
              createPostResult.fetching === true || selectedUsers.length === 0
            }
            appearance="primary"
            onClick={onCreatePost}
          >
            Post Link
          </Button>
        </>
      )}
    </div>
  );
};

export default CreatePostComponent;
