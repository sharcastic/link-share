import React, { useState } from "react";
import { useAuth0 } from "../../utils/Auth0";
import CreatePostComponent from "../CreatePostComponent";

const HomeFeedElement = ({
  post: { id, link, description, author, post_tagged_users = [] },
  editedPost,
  changeEditedPost
}) => {
  const { user = {} } = useAuth0();
  const [temporaryEditState, setTemporaryState] = useState({});
  const onEditPostClick = () => {
    setTemporaryState({
      description,
      link,
      selectedUsers: post_tagged_users.map(i => ({ ...i.user, tagId: i.id }))
    });
    changeEditedPost(id);
  };
  return (
    <div>
      {editedPost === id ? (
        <CreatePostComponent
          description={temporaryEditState.description}
          link={temporaryEditState.link}
          selectedUsers={temporaryEditState.selectedUsers}
          postID={id}
          changeEditedPost={changeEditedPost}
        />
      ) : (
        <div data-testid="HomeFeedItem">
          <a href={link}>{link}</a>
          <span> | Description -> {description}</span>
          <span> | Created by -> {author.name}</span>
          <span>
            {" "}
            |{" "}
            {post_tagged_users.length > 0 ? (
              <span data-testid="HomeFeedItem--sharedWith">
                `Shared with -> $
                {post_tagged_users.reduce(
                  (acc, i) => `${acc}${i.user.name} | `,
                  ""
                )}
                `
              </span>
            ) : (
              <span> "Not Shared to anyone else |"</span>
            )}
          </span>
          {author.id === user.sub && editedPost === undefined && (
            <span onClick={onEditPostClick}>Edit Post</span>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeFeedElement;
