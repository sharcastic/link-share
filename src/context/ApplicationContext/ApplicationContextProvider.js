import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";

import useIntersect from "../../hooks/useObserver";
import ApplicationContext from "./ApplicationContext";

const initialHomeFeedState = new Map();
initialHomeFeedState.set("1", {
  postDescription: "Post description 1",
  id: "1",
  url:
    "https://www.reddit.com/r/ProgrammerHumor/comments/gcl1lc/thank_you_guys_you_are_the_real_heroes"
});
initialHomeFeedState.set("2", {
  postDescription: "Post description 2",
  id: "2",
  url: "https://www.theguardian.com/international"
});
initialHomeFeedState.set("3", {
  postDescription: "Post description 3",
  id: "3",
  url: "https://vercel.com/docs"
});
initialHomeFeedState.set("4", {
  postDescription: "Post description 4",
  id: "4",
  url:
    "https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/"
});
initialHomeFeedState.set("5", {
  postDescription: "Post description 5",
  id: "5",
  url: "https://bleacherreport.com/articles/2888941-dubs-dynasty-plot-20"
});

const ApplicationContextProvider = ({ children }) => {
  const [setIntersectRef, entry] = useIntersect({
    threshold: 0
  });
  const [showHomeTextInput, setShowTextInput] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [desktopSelectedPost, setSelectedPost] = useState();
  const [editingPost, setEditingPost] = useState();
  const [homeRef, setRef] = useState();
  const [homeFeedPosts] = useState(initialHomeFeedState);

  const setHomeRef = ref => {
    if (isMobile) {
      setRef(ref);
    }
  };
  const changeEditingPost = id => {
    setEditingPost(id ? homeFeedPosts.get(id) : undefined);
  };
  const setDesktopSelectedPost = (id = undefined, panel = undefined) => {
    setSelectedPost(id ? { id, panel } : undefined);
  };
  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
    document.documentElement.classList.toggle("theme-light");
    document.documentElement.classList.toggle("theme-dark");
  };
  useEffect(() => {
    setIntersectRef(homeRef);
  }, [homeRef]);
  useEffect(() => {
    setShowTextInput(!showHomeTextInput);
  }, [entry]);
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
        changeEditingPost,
        isMobile,
        desktopSelectedPost,
        setDesktopSelectedPost,
        setHomeRef,
        showHomeTextInput
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
