import { createContext } from "react";

const AppliationContext = createContext({
  darkTheme: false,
  toggleDarkTheme: () => {},
  homeFeedPosts: [],
  editingPost: undefined,
  changeEditingPost: () => {}
});

export default AppliationContext;
