import React, { createContext, useContext, useState, useRef } from "react";

import useOnClickOutside from "../../hooks/useOnClickOutside";

const PanelContext = createContext({
  isOpen: false,
  setIsOpen: () => {}
});

const PanelContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setOpen = (state = undefined) => {
    setIsOpen(state === undefined ? !isOpen : state);
  };
  return (
    <PanelContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </PanelContext.Provider>
  );
};

const VisibleComponent = ({ children }) => {
  return <>{children}</>;
};

const HiddenComponent = ({ children }) => {
  const { isOpen } = useContext(PanelContext);
  return (
    <ul className={isOpen ? "hidden-component" : "hide hidden-component"}>
      {children}
    </ul>
  );
};

export const PanelItem = ({ children, onClick }) => {
  return <li onClick={onClick}>{children}</li>;
};

const Panel = ({ parentChildren }) => {
  const { setOpen } = useContext(PanelContext);
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div ref={ref} onClick={setOpen} className="panel-container">
      {parentChildren}
    </div>
  );
};

const PanelContainer = ({ children }) => {
  return (
    <PanelContextProvider>
      <Panel parentChildren={children} />
    </PanelContextProvider>
  );
};

PanelContainer.VisibleComponent = VisibleComponent;
PanelContainer.HiddenComponent = HiddenComponent;

export default PanelContainer;
