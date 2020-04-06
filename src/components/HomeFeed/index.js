import React from "react";

const HomeFeed = ({ posts }) => {
  if (!posts) {
    return <div>Loading POSTS!</div>;
  }
  return (
    <div>
      POSTS :
      {posts.map(i => (
        <div key={i.id}>
          <span>{i.link}</span>
          <span> | Description -> {i.description}</span>
          <span> | Created by -> {i.author.name}</span>
        </div>
      ))}
    </div>
  );
};

export default HomeFeed;
