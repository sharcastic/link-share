import { createContext } from "react";

const ApplicationContext = createContext({
  darkTheme: undefined,
  toggleDarkTheme: undefined,
  homeFeedPosts: undefined,
  editingPost: undefined,
  changeEditingPost: undefined,
  isMobile: undefined,
  desktopSelectedPost: undefined,
  setDesktopSelectedPost: undefined,
  showHomeTextInput: undefined,
  setShowTextInputValue: undefined,
  connections: undefined,
  notifications: undefined,
  deletePost: undefined,
  createPost: undefined,
  updatePost: undefined,
  addComment: undefined,
  acceptRequest: undefined,
  onMarkAsReadClick: undefined,
  connectionRequests: undefined,
  handleAddRequest: undefined,
});

export default ApplicationContext;
