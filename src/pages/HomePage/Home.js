import React from "react";
import { useSubscription } from "urql";
import { getPostsForFeedSubscriptionQuery } from "../../queries";
import { useAuth0 } from "../../utils/Auth0";
import CreatePostComponent from "../../components/CreatePostComponent";
import HomeFeed from "../../components/HomeFeed";
import "../../styles/Home.scss";

const handleFeedPostsSubscription = (_, response) => {
  return response.links;
};

const Home = () => {
  const { user = {} } = useAuth0();
  const [postsSubscriptionResponse] = useSubscription(
    {
      query: getPostsForFeedSubscriptionQuery,
      variables: { user_id: user.sub }
    },
    handleFeedPostsSubscription
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      Home!
      <CreatePostComponent />
      <HomeFeed posts={postsSubscriptionResponse.data} />
    </div>
  );
};

export default Home;
