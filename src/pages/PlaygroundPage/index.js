import React, { useState, useContext, useEffect } from "react";

import "../../styles/Playground.scss";

import LinkCard from "../../components/LinkCard";
import CreatePost from "../../components/CreatePost";

import { callServerless } from "../../utils/network";
import ApplicationContext from "../../context/ApplicationContext/ApplicationContext";

const PlaygroundPage = () => {
  const { homeFeedPosts } = useContext(ApplicationContext);

  const [posts, setPosts] = useState([]);
  const [postPreviews, setPostPreviews] = useState({});
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const getPreviews = async () => {
      const arr = [];
      homeFeedPosts.forEach(value => {
        arr.push(value);
      });
      const response = await callServerless(arr.map(i => i.url));
      setPostPreviews(response);
      setPosts(arr);
      setPageLoading(false);
    };
    getPreviews();
  }, [homeFeedPosts]);

  return (
    <div className="playground-page">
      {pageLoading ? (
        <div>Loading Posts!</div>
      ) : (
        <main>
          {posts.map(post => (
            <LinkCard
              cardData={post}
              key={post.id}
              previewData={postPreviews[post.url]}
            />
          ))}
        </main>
      )}
      <div className="hidden-container">
        <CreatePost />
      </div>
    </div>
  );
};

export default PlaygroundPage;
