import { createContext } from "react";

const AppliationContext = createContext({
  darkTheme: false,
  toggleDarkTheme: () => {},
  homeFeedPosts: [],
  editingPost: undefined,
  changeEditingPost: () => {},
  isMobile: true,
  desktopSelectedPost: undefined,
  setDesktopSelectedPost: () => {},
  setHomeRef: () => {},
  showHomeTextInput: true
});

export default AppliationContext;
