import React from "react";
import "../../styles/Playground.scss";
import { useAuth0 } from "../../utils/Auth0";
import { ReactComponent as NotificationIcon } from "../../assets/notifications.svg";
import IconButton from "../../components/IconButton";

const PlaygroundPage = () => {
  const { user = {} } = useAuth0();
  return (
    <div className="playground-page">
      <header>
        <h2 className="header-title">Playground</h2>
        <div className="header-right">
          <IconButton
            Icon={NotificationIcon}
            title="Notifications"
            className="notifications-button"
          />
          <button className="profile-button">
            <img src={user.picture} alt="Profile Button" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default PlaygroundPage;
