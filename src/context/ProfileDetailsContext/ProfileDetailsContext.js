import { createContext } from "react";

const ProfileDetailsContext = createContext({
  connections: [],
  updateConnectionsAndRequests: () => {},
  currentRequests: [],
  acceptRequest: () => {}
});

export default ProfileDetailsContext;
