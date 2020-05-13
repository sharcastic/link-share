import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback
} from "react";
import clsx from "clsx";

import Button from "../Button";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import "../../styles/OptionsPanel.scss";

const PanelContext = createContext();

const PanelContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setOpen = useCallback((state = undefined) => {
    setIsOpen(state === undefined ? !isOpen : state);
  }, []);
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
  if (isOpen) {
    return (
      <div className="hidden-component">
        {headerElement}
        <ul>{children}</ul>
      </div>
    );
  }
  return null;
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

export const NotificationItem = ({ id, type }) => {
  switch (type) {
    case "request": {
      return (
        <li className="notification-item request-notification">
          <span>Request Notification</span>
          <div className="button-section">
            <Button className="ignore-button" type="plain">
              Ignore
            </Button>
            <Button className="accept-button">Accept</Button>
          </div>
        </li>
      );
    }
    case "unread": {
      return (
        <li className="notification-item unread-notification">
          <span>Unread Notification</span>
          <div className="button-section">
            <Button className="mark-button" type="plain">
              Mark as Read
            </Button>
          </div>
        </li>
      );
    }
    case "read": {
      return (
        <li className="notification-item read-notification">
          Read Notification
        </li>
      );
    }
    default: {
      return <li />;
    }
  }
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
