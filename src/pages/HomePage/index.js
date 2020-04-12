import React, { useContext } from "react";
import { useSubscription } from "urql";
import {
  getPostsForFeedSubscriptionQuery,
  getNotificationsSubscriptionQuery
} from "../../queries";
import { useAuth0 } from "../../utils/Auth0";
import CreatePostComponent from "../../components/CreatePostComponent";
import NotificationsComponent from "../../components/Notifications";
import HomeFeed from "../../components/HomeFeed";
import AddConnections from "../../components/AddConnections";
import ProfileDetailsContext from "../../context/ProfileDetailsContext/ProfileDetailsContext";
import "../../styles/Home.scss";

const handleFeedPostsSubscription = (_, response) => {
  return response.links;
};

const handleNotificationsSubscription = (_, response, connections) => {
  if (connections) {
    return response.notifications;
  }
  return [];
};

const Home = () => {
  const { user = {} } = useAuth0();
  const { connections } = useContext(ProfileDetailsContext);
  const [postsSubscriptionResponse] = useSubscription(
    {
      query: getPostsForFeedSubscriptionQuery,
      variables: { user_id: user.sub }
    },
    handleFeedPostsSubscription
  );

  const [notificationsSubscriptionResponse] = useSubscription(
    {
      query: getNotificationsSubscriptionQuery,
      variables: { user_id: user.sub }
    },
    (_, data) => handleNotificationsSubscription(_, data, connections)
  );

  console.log(notificationsSubscriptionResponse.data);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      Home!
      {notificationsSubscriptionResponse.data && (
        <NotificationsComponent
          notifications={notificationsSubscriptionResponse.data}
        />
      )}
      <CreatePostComponent />
      <HomeFeed posts={postsSubscriptionResponse.data} />
      <AddConnections />
    </div>
  );
};

export default Home;
