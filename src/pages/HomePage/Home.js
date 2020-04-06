import React, { useState } from "react";
import { useQuery, useSubscription } from "urql";
import { isLinkRegex } from "../../constants";
import {
  getFriendsQuery,
  getPostsForFeedSubscriptionQuery
} from "../../queries";
import { useAuth0 } from "../../utils/Auth0";
import CreatePostComponent from "../../components/CreatePostComponent";
import HomeFeed from "../../components/HomeFeed";
import "../../styles/Home.scss";

const handleFeedPostsSubscription = (_, response) => {
  // console.log("FROM REDUCER", response);
  return response.links;
};

const Home = () => {
  const { user = {} } = useAuth0();
  const [linkText, setLinkText] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState({ responseReceived: false });
  const [selectedUsers, setUsersSelected] = useState([]);
  const [postsSubscriptionResponse] = useSubscription(
    {
      query: getPostsForFeedSubscriptionQuery,
      variables: { user_id: user.sub }
    },
    handleFeedPostsSubscription
  );
  const [friendsResult, reExecuteQuery] = useQuery({
    query: getFriendsQuery,
    variables: { user_id: user.sub },
    pause: !user.sub
  });
  const {
    data: { users: [{ connections }] = [{ connections: [] }] } = {},
    fetching: friendsFetching,
    error: friendsError
  } = friendsResult;
  const friends = [
    ...connections.map(i => ({
      ...i.user_connected,
      type: "user"
    })),
    {
      name: `${user.name} (Me)`,
      email: user.email,
      id: user.sub,
      type: "user"
    }
  ];
  const callServerless = async url => {
    if (isLinkRegex.test(url)) {
      try {
        const res = await fetch(`/api/test?link=${url}`);
        const json = await res.json();
        setPreview({ ...json, responseReceived: true });
        console.log("RESPONSE FROM FETCH", json);
      } catch {
        setPreview({
          error: "Preview cannot be generated",
          responseReceived: true
        });
      }
    }
  };
  const onInputBlur = () => {
    callServerless(linkText);
  };
  const onLinkTextChange = text => setLinkText(text);
  const onDescriptionChange = text => setDescription(text);
  const onUsersSelectedChange = users =>
    users === undefined ? setUsersSelected([]) : setUsersSelected(users);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      Home!
      <CreatePostComponent
        description={description}
        onDescriptionChange={onDescriptionChange}
        selectedUsers={selectedUsers}
        onUsersSelectedChange={onUsersSelectedChange}
        preview={preview}
        friends={friends}
        user={user}
        linkText={linkText}
        onLinkTextChange={onLinkTextChange}
        onLinkTextBlur={onInputBlur}
      />
      <HomeFeed posts={postsSubscriptionResponse.data} />
    </div>
  );
};

export default Home;
