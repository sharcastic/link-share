import React, { useState, useContext, useEffect } from "react";

import "../../styles/Playground.scss";

import LinkCard from "../../components/LinkCard";
import Modal from "../../components/Modal";

import { callServerless } from "../../utils/network";
import ApplicationContext from "../../context/ApplicationContext/ApplicationContext";

const PlaygroundPage = () => {
  const {
    homeFeedPosts,
    desktopSelectedPost,
    setDesktopSelectedPost
  } = useContext(ApplicationContext);
  const [posts, setPosts] = useState(undefined);
  const [postPreviews, setPostPreviews] = useState({});
  const [selectedPost, setSelectedPost] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(!!desktopSelectedPost);
    setSelectedPost(
      desktopSelectedPost
        ? homeFeedPosts.get(desktopSelectedPost.id)
        : undefined
    );
  }, [desktopSelectedPost]);

  useEffect(() => {
    console.log("homeFeedPosts from useEffect", homeFeedPosts);

    const getPreviews = async () => {
      const response = await callServerless(homeFeedPosts.map(i => i.link));
      setPostPreviews(response);
      setPosts(homeFeedPosts);
    };
    if (homeFeedPosts !== undefined) {
      getPreviews();
    }
  }, [homeFeedPosts]);

  if (posts === undefined) {
    return <div className="playground-page">Loading Posts!!</div>;
  }

  return (
    <div className="playground-page">
      {posts.length === 0 ? (
        <div>No Posts to display!</div>
      ) : (
        <main>
          {posts.map(post => (
            <LinkCard
              cardData={post}
              key={post.id}
              previewData={postPreviews[post.url]}
            />
          ))}
          {isModalOpen && (
            <Modal onCloseClick={() => setDesktopSelectedPost()}>
              <LinkCard
                cardData={selectedPost}
                previewData={postPreviews[selectedPost.url]}
                fromModal
                selectedPanel={
                  desktopSelectedPost ? desktopSelectedPost.panel : undefined
                }
              />
            </Modal>
          )}
        </main>
      )}
    </div>
  );
};

export default PlaygroundPage;
