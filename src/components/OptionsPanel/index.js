import React, { createContext, useContext, useState, useRef } from "react";
import clsx from "clsx";

import useOnClickOutside from "../../hooks/useOnClickOutside";

import "../../styles/OptionsPanel.scss";

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

const HiddenComponent = ({ children, headerElement = null }) => {
  const { isOpen } = useContext(PanelContext);
  return (
    <div className={isOpen ? "hidden-component" : "hide hidden-component"}>
      {headerElement}
      <ul>{children}</ul>
    </div>
  );
};

export const PanelItem = ({ children, onClick }) => {
  const { setOpen } = useContext(PanelContext);
  const onItemClick = () => {
    setOpen(false);
    onClick();
  };
  return (
    <li onClick={onItemClick} className="panel-item">
      {children}
    </li>
  );
};

const Panel = ({ parentChildren, className }) => {
  const { setOpen } = useContext(PanelContext);
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div
      ref={ref}
      onClick={() => setOpen()}
      className={clsx(["panel-container", className])}
    >
      {parentChildren}
    </div>
  );
};

const PanelContainer = ({ children, className }) => {
  return (
    <PanelContextProvider>
      <Panel parentChildren={children} className={className} />
    </PanelContextProvider>
  );
};

PanelContainer.VisibleComponent = VisibleComponent;
PanelContainer.HiddenComponent = HiddenComponent;

export default PanelContainer;
