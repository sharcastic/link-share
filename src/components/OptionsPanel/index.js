import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect
} from "react";
import clsx from "clsx";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import {
  REQUEST_RECEIVED,
  TAGGED_POST,
  UNREAD,
  COMMENT_CREATED
} from "../../constants";
import Button from "../Button";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import "../../styles/OptionsPanel.scss";

const PanelContext = createContext();

const PanelContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    isOpen ? disableBodyScroll() : enableBodyScroll();
  }, [isOpen]);
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
        {children}
      </div>
    );
  }
  return null;
};

export const PanelItem = ({ children, onClick }) => {
  const { setOpen } = useContext(PanelContext);
  const onItemClick = useCallback(e => {
    e.stopPropagation();
    onClick();
    setOpen(false);
  }, []);
  return (
    <li onClick={onItemClick} className="panel-item">
      {children}
    </li>
  );
};

const NotificationItem = ({
  data: {
    content_id,
    notification_created_by: { name },
    status,
    type
  }
}) => {
  const renderNotificationText = () => {
    if (type === REQUEST_RECEIVED) {
      return `${name} sent you a friend request`;
    }
    if (type === TAGGED_POST) {
      return `${name} tagged you in a post`;
    }
    if (type === COMMENT_CREATED) {
      return `${name} commented on a post`;
    }
  };

  const renderNotificationButtons = () => {
    if (type === REQUEST_RECEIVED) {
      return (
        <div className="button-section">
          <Button className="ignore-button" type="plain">
            Ignore
          </Button>
          <Button className="accept-button">Accept</Button>
        </div>
      );
    }
    if (status === UNREAD) {
      return (
        <div className="button-section">
          <Button className="mark-button" type="plain">
            Mark as Read
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <li className={`notification-item ${status.toLowerCase()}-item`}>
      {renderNotificationText()}
      {renderNotificationButtons()}
    </li>
  );
};

export const NotificationItems = ({ data }) => {
  if (data.length === 0) {
    return <div>No Notifications!</div>;
  }
  return (
    <ul>
      {data.map(i => (
        <NotificationItem key={i.id} data={i} />
      ))}
    </ul>
  );
};

const Panel = ({ parentChildren, className }) => {
  const { isOpen, setOpen } = useContext(PanelContext);
  const ref = useRef();
  useOnClickOutside(ref, () => {
    if (isOpen) {
      setOpen(false);
    }
  });
  const onClick = useCallback(() => setOpen(), []);
  return (
    <div
      ref={ref}
      onClick={onClick}
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
