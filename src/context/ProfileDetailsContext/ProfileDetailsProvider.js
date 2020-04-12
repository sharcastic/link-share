import React from "react";
import { useQuery } from "urql";
import { useAuth0 } from "../../utils/Auth0";
import ProfileDetailsContext from "./ProfileDetailsContext";
import { getConnectionsAndRequestsQuery } from "../../queries";

const ProfileProvider = ({ children }) => {
  const { user = {} } = useAuth0();
  const [connectionsResult, reExecuteQuery] = useQuery({
    query: getConnectionsAndRequestsQuery,
    variables: { user_id: user.sub },
    pause: !user.sub
  });
  const {
    data: { connections = [], connection_request = [] } = {},
    fetching,
    error
  } = connectionsResult;
  const connectionsArr = [...connections.map(i => i.user_connected)];
  const updateConnectionsAndRequests = () =>
    reExecuteQuery({ requestPolicy: "network-only" });
  return (
    <ProfileDetailsContext.Provider
      value={{
        connections: connectionsArr,
        currentRequests: connection_request,
        updateConnectionsAndRequests
      }}
    >
      {children}
    </ProfileDetailsContext.Provider>
  );
};

export default ProfileProvider;
