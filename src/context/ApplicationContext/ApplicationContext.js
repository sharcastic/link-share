import { createContext } from "react";

const AppliationContext = createContext({
  darkTheme: false,
  toggleDarkTheme: () => {}
});

export default AppliationContext;
