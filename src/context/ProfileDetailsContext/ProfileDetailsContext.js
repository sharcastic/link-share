import { createContext } from "react";

const ProfileDetailsContext = createContext({
  connections: [],
  updateConnectionsAndRequests: () => {},
  currentRequests: []
});

export default ProfileDetailsContext;
