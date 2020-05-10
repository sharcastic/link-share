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
  const [posts, setPosts] = useState([]);
  const [postPreviews, setPostPreviews] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
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
          {posts.map((post, index) => (
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
