import React, { useState, useEffect } from "react";

import ApplicationContext from "./ApplicationContext";

const ApplicationContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
    document.documentElement.classList.toggle("theme-light");
    document.documentElement.classList.toggle("theme-dark");
  };
  useEffect(() => {
    document.documentElement.classList.toggle("theme-light");
  }, []);
  return (
    <ApplicationContext.Provider
      value={{
        darkTheme,
        toggleDarkTheme
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
