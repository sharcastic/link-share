import React, { useState, useEffect, useCallback } from "react";
import { isMobile } from "react-device-detect";
import { useAuth0 } from "../../utils/Auth0";
import { useQuery, useSubscription, useMutation } from "urql";
import { useToasts } from "react-toast-notifications";

import {
  handleNotificationsSubscription,
  handleFeedPostsSubscription
} from "../../utils/methods";
import {
  getConnectionsAndRequestsQuery,
  getNotificationsSubscriptionQuery,
  getPostsForFeedSubscriptionQuery,
  createPostMutation,
  deletePostMutation,
  updatePostMutation,
  addCommentMutation
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
  const { addToast } = useToasts();
  const [showHomeTextInput, setShowTextInput] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [desktopSelectedPost, setSelectedPost] = useState();
  const [editingPost, setEditingPost] = useState();
  // const [homeFeedPosts] = useState(new Map());

  const [
    {
      data: { connections = [] } = {} // this object has fetching and error and reExecuteQuery is the 2nd array item from useQuery
    }
  ] = useQuery({
    query: getConnectionsAndRequestsQuery,
    variables: { user_id: user.sub },
    pause: !user.sub
  });
  const [, deletePostFromDatabase] = useMutation(deletePostMutation);
  const [, createPostInDatabase] = useMutation(createPostMutation);
  const [, updatePostInDatabase] = useMutation(updatePostMutation);
  const [, addCommentInDatabase] = useMutation(addCommentMutation);
  // HAVE TO HANDLE LOADING STATE WHILE LOADING FOR THE MUTATIONS!!
  const [{ data: notifications }] = useSubscription(
    // This object has fetching, stale and error
    {
      query: getNotificationsSubscriptionQuery,
      variables: { user_id: user.sub }
    },
    handleNotificationsSubscription
  );
  const [{ data: homeFeedPosts = undefined }] = useSubscription(
    {
      query: getPostsForFeedSubscriptionQuery,
      variables: { user_id: user.sub }
    },
    handleFeedPostsSubscription
  );

  const changeEditingPost = useCallback(
    id => setEditingPost(id ? homeFeedPosts.find(i => i.id === id) : undefined),
    [homeFeedPosts]
  );
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
  const deletePost = useCallback(
    postID => {
      deletePostFromDatabase({ postID }).then(res => {
        if (!res.error) {
          console.log(res);
          addToast("Deleted your post!", { appearance: "success" });
        }
      });
    },
    [deletePostFromDatabase]
  );
  const updatePost = useCallback(
    (description, link, newlyTaggedUsers, removedUsers) => {
      const { id: postID = undefined } = editingPost;
      if (postID) {
        return updatePostInDatabase({
          postID,
          description,
          link,
          removedUsers,
          addingTags: newlyTaggedUsers.map(i => ({
            user_id: i,
            post_id: postID
          })),
          addNotifications: newlyTaggedUsers.map(i => ({
            targeted_user_id: i,
            status: "UNREAD",
            type: "TAGGED_POST",
            created_by_id: user.sub,
            content_id: postID
          }))
        }).then(res => {
          if (!res.error) {
            addToast("Updated your post!", { appearance: "success" });
          }
          return res;
        });
      }
    },
    [user, updatePostInDatabase, editingPost]
  );

  const addComment = useCallback(
    (content, postID) => {
      const { author, post_tagged_users } = homeFeedPosts.find(
        i => i.id === postID
      );
      const peopleToNotify = [
        author.id,
        ...post_tagged_users.map(({ user }) => user.id)
      ].filter(i => i !== user.sub);
      return addCommentInDatabase({
        userID: user.sub,
        postID: postID,
        content,
        addNotifications: peopleToNotify.map(i => ({
          targeted_user_id: i,
          status: "UNREAD",
          type: "COMMENT_CREATED",
          created_by_id: user.sub,
          content_id: postID
        }))
      }).then(res => {
        if (!res.error) {
          addToast("Added a comment!", { appearance: "success" });
        }
        return res;
      });
    },
    [user, homeFeedPosts, addCommentInDatabase]
  );

  const createPost = useCallback(
    (description, link, selectedUsers = []) =>
      createPostInDatabase({
        userId: user.sub,
        description,
        link,
        taggedUsers: selectedUsers.map(i => ({ user_id: i.id })),
        notifications: selectedUsers.map(i => ({
          targeted_user_id: i.id,
          status: "UNREAD",
          type: "TAGGED_POST",
          created_by_id: user.sub
        }))
      }).then(res => {
        if (!res.error) {
          addToast("Added a post!", { appearance: "success" });
        }
        return res;
      }),
    [createPostInDatabase, user]
  );

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
        notifications,
        deletePost,
        createPost,
        updatePost,
        addComment
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
