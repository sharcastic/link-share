import React, { useState, useEffect } from "react";

import ApplicationContext from "./ApplicationContext";

const initialHomeFeedState = [
  {
    previewData: {
      imgSrc:
        "https://techcrunch.com/wp-content/themes/techcrunch-2017/images/opengraph-default.png",
      description: "URL Title 1",
      title: "URL description 1"
    },
    postDescription: "Post description 1",
    url:
      "https://techcrunch.com/wp-content/themes/techcrunch-2017/images/opengraph-default.png"
  },
  {
    previewData: {
      imgSrc:
        "https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png",
      description: "URL Title 2",
      title: "URL description 2"
    },
    postDescription: "Post description 2",
    url:
      "https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png"
  },
  {
    previewData: {
      imgSrc: "",
      description: "URL Title 3",
      title: "URL description 3"
    },
    postDescription: "Post description 3",
    url: "No URL"
  }
];

const ApplicationContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [homeFeedPosts] = useState(initialHomeFeedState);
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
        homeFeedPosts
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
