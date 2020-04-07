import React, { useState } from "react";
import HomeFeedElement from "../HomeFeedElement";

const HomeFeed = ({ posts }) => {
  const [editedPost, setEditedPost] = useState();
  if (!posts) {
    return <div>Loading POSTS!</div>;
  }
  const changeEditedPost = id => setEditedPost(id);

  return (
    <div>
      POSTS :
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} style={{ borderBottom: "1px solid black" }}>
            <HomeFeedElement
              post={post}
              editedPost={editedPost}
              changeEditedPost={changeEditedPost}
            />
          </div>
        ))
      ) : (
        <div>No Posts to display!</div>
      )}
    </div>
  );
};

export default HomeFeed;
