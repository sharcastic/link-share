import React from "react";
import { useQuery } from "urql";
import { useAuth0 } from "../../utils/Auth0";
import ProfileDetailsContext from "./ProfileDetailsContext";
import { getFriendsQuery } from "../../queries";

const ProfileProvider = ({ children }) => {
  const { user = {} } = useAuth0();
  const [friendsResult, reExecuteQuery] = useQuery({
    query: getFriendsQuery,
    variables: { user_id: user.sub },
    pause: !user.sub
  });
  const { data: { connections = [] } = {}, fetching, error } = friendsResult;
  const friends = [...connections.map(i => i.user_connected)];
  return (
    <ProfileDetailsContext.Provider value={{ friends }}>
      {children}
    </ProfileDetailsContext.Provider>
  );
};

export default ProfileProvider;
