import React, { useState, useContext, useEffect } from "react";

import "../../styles/Playground.scss";

import LinkCard from "../../components/LinkCard";
import Modal from "../../components/Modal";
import AddToHomescreen from "../../components/AddToHomescreen"

import { callServerless } from "../../utils/network";
import ApplicationContext from "../../context/ApplicationContext/ApplicationContext";

const PlaygroundPage = () => {
  const {
    homeFeedPosts,
    desktopSelectedPost,
    setDesktopSelectedPost,
  } = useContext(ApplicationContext);
  const [posts, setPosts] = useState(undefined);
  const [postPreviews, setPostPreviews] = useState({});
  const [selectedPost, setSelectedPost] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(!!desktopSelectedPost);
    setSelectedPost(
      desktopSelectedPost
        ? homeFeedPosts.find((i) => i.id === desktopSelectedPost.id)
        : undefined
    );
  }, [desktopSelectedPost, homeFeedPosts]);

  useEffect(() => {
    const getPreviews = async () => {
      const response = await callServerless(homeFeedPosts.map((i) => i.link));
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

  let deferredPrompt; // Allows to show the install prompt
  const installButton = document.getElementById("install_button");

  window.addEventListener("beforeinstallprompt", e => {
    console.log("beforeinstallprompt fired");
    // Prevent Chrome 76 and earlier from automatically showing a prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show the install button
    installButton.hidden = false;
    installButton.addEventListener("click", installApp);
  });

  function installApp() {
    // Show the prompt
    deferredPrompt.prompt();
    installButton.disabled = true;
  
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        console.log("PWA setup accepted");
        installButton.hidden = true;
      } else {
        console.log("PWA setup rejected");
      }
      installButton.disabled = false;
      deferredPrompt = null;
    });
  }
  window.addEventListener("appinstalled", evt => {
    console.log("appinstalled fired", evt);
  });

  return (
    <div className="playground-page">
      {posts.length === 0 ? (
        <div>No Posts to display!</div>
      ) : (
        <main>
          <button id="install_button" hidden>Install</button>
          {posts.map((post) => (
            <LinkCard
              cardData={post}
              key={post.id}
              previewData={postPreviews[post.link]}
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
