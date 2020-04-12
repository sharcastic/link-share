import React from "react";
import { useQuery, useMutation } from "urql";
import { useAuth0 } from "../../utils/Auth0";
import ProfileDetailsContext from "./ProfileDetailsContext";
import {
  getConnectionsAndRequestsQuery,
  addConnectionMutation
} from "../../queries";

const ProfileProvider = ({ children }) => {
  const { user = {} } = useAuth0();
  const [connectionsResult, reExecuteQuery] = useQuery({
    query: getConnectionsAndRequestsQuery,
    variables: { user_id: user.sub },
    pause: !user.sub
  });
  const [, addConnection] = useMutation(addConnectionMutation);
  const {
    data: { connections = [], connection_request = [] } = {},
    fetching,
    error
  } = connectionsResult;
  const connectionsArr = [...connections.map(i => i.user_connected)];
  const updateConnectionsAndRequests = () =>
    reExecuteQuery({ requestPolicy: "network-only" });
  const acceptRequest = (requestedUserID, callback) => {
    addConnection({
      requestedUserID,
      userID: user.sub,
      connectionObject: [
        {
          user_id: requestedUserID,
          connected_user_id: user.sub
        },
        {
          user_id: user.sub,
          connected_user_id: requestedUserID
        }
      ]
    }).then(res => {
      if (!res.error) {
        updateConnectionsAndRequests();
        if (callback) {
          callback();
        }
      }
    });
  };
  return (
    <ProfileDetailsContext.Provider
      value={{
        connections: connectionsArr,
        currentRequests: connection_request,
        updateConnectionsAndRequests,
        acceptRequest
      }}
    >
      {children}
    </ProfileDetailsContext.Provider>
  );
};

export default ProfileProvider;
