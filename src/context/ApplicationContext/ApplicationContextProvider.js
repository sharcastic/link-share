import React, { useState, useEffect } from "react";

import ApplicationContext from "./ApplicationContext";

const initialHomeFeedState = [
  {
    previewData: {
      imgSrc:
        "https://techcrunch.com/wp-content/themes/techcrunch-2017/images/opengraph-default.png",
      title: "URL Title 1",
      description: "URL description 1"
    },
    postDescription: "Post description 1",
    id: "1",
    url:
      "https://techcrunch.com/wp-content/themes/techcrunch-2017/images/opengraph-default.png"
  },
  {
    previewData: {
      imgSrc:
        "https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png",
      title: "URL Title 2",
      description: "URL description 2"
    },
    postDescription: "Post description 2",
    id: "2",
    url:
      "https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png"
  },
  {
    previewData: {
      imgSrc: "",
      title: "URL Title 3",
      description: "URL description 3"
    },
    postDescription: "Post description 3",
    id: "3",
    url: "No URL"
  }
];

const ApplicationContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [editingPost, setEditingPost] = useState();
  const [homeFeedPosts] = useState(initialHomeFeedState);
  const changeEditingPost = id => {
    setEditingPost(id ? homeFeedPosts.find(i => i.id === id) : undefined);
  };
  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
    document.documentElement.classList.toggle("theme-light");
    document.documentElement.classList.toggle("theme-dark");
  };
  useEffect(() => {
    document.documentElement.classList.toggle("theme-light");
  }, []);
  return (
    <ApplicationContext.Provider
      value={{
        darkTheme,
        toggleDarkTheme,
        homeFeedPosts,
        editingPost,
        changeEditingPost
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
