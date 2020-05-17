import React, { useState, useEffect, useCallback } from "react";
import { isMobile } from "react-device-detect";
import { useAuth0 } from "../../utils/Auth0";
import { useQuery, useSubscription } from "urql";

import { handleNotificationsSubscription } from "../../utils/methods";
import {
  getConnectionsAndRequestsQuery,
  getNotificationsSubscriptionQuery
} from "../../queries";
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
  const { user = {} } = useAuth0();
  const [showHomeTextInput, setShowTextInput] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [desktopSelectedPost, setSelectedPost] = useState();
  const [editingPost, setEditingPost] = useState();
  const [homeFeedPosts] = useState(initialHomeFeedState);

  const [
    {
      data: { connections = [] } = {} // this object has fetching and error and reExecuteQuery is the 2nd array item from useQuery
    }
  ] = useQuery({
    query: getConnectionsAndRequestsQuery,
    variables: { user_id: user.sub },
    pause: !user.sub
  });
  const [{ data: notifications }] = useSubscription(
    // This object has fetching, stale and error
    {
      query: getNotificationsSubscriptionQuery,
      variables: { user_id: user.sub }
    },
    handleNotificationsSubscription
  );

  const changeEditingPost = useCallback(id => {
    setEditingPost(id ? homeFeedPosts.get(id) : undefined);
  }, []);
  const setDesktopSelectedPost = useCallback(
    (id = undefined, panel = undefined) => {
      setSelectedPost(id ? { id, panel } : undefined);
    },
    []
  );
  const toggleDarkTheme = useCallback(() => {
    setDarkTheme(!darkTheme);
    document.documentElement.classList.toggle("theme-light");
    document.documentElement.classList.toggle("theme-dark");
  }, []);
  const setShowTextInputValue = useCallback(bool => setShowTextInput(bool), []);

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
        showHomeTextInput,
        setShowTextInputValue,
        connections,
        notifications
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
