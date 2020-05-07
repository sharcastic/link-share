import React, { useRef, useState, useContext } from "react";
import clsx from "clsx";

import { ReactComponent as NotificationIcon } from "../../assets/icons/notifications.svg";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo-mobile.svg";
import { ReactComponent as PreferencesIcon } from "../../assets/icons/preferences.svg";
import { ReactComponent as TorchIcon } from "../../assets/icons/torch.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";

import Panel, {
  PanelItem,
  NotificationItem
} from "../../components/OptionsPanel";
import ProfileIcon from "../../components/ProfileIcon";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";

import { useAuth0 } from "../../utils/Auth0";
import ApplicationContext from "../../context/ApplicationContext/ApplicationContext";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import "../../styles/Header.scss";

const Header = () => {
  const refNotification = useRef();

  const { user = {}, logoutUser } = useAuth0();
  const { darkTheme, toggleDarkTheme } = useContext(ApplicationContext);

  const [isNotiOpen, setNotiOpen] = useState(false);

  const toggleNotificationsOpen = () => setNotiOpen(!isNotiOpen);
  useOnClickOutside(refNotification, () => setNotiOpen(false));
  const toggleThemes = () => toggleDarkTheme();

  return (
    <header>
      <div className="header-left">
        <LogoIcon className="mobile-icon" title="Logo" />
        <h2 className="header-title">Playground</h2>
      </div>
      <div className="header-right">
        <Panel className="notification-container">
          <Panel.VisibleComponent>
            <IconButton
              Icon={NotificationIcon}
              title="Notifications"
              className="notifications-icon"
            />
            <span className="unread-indicator" />
          </Panel.VisibleComponent>
          <Panel.HiddenComponent
            headerElement={
              <div className="hidden-header">
                <Button type="plain">View All</Button>
                <Button type="plain">Updates</Button>
              </div>
            }
          >
            <NotificationItem type="request" id="1" />
            <NotificationItem type="unread" id="1" />
            <NotificationItem type="read" id="1" />
          </Panel.HiddenComponent>
        </Panel>
        <Panel className="profile-container">
          <Panel.VisibleComponent>
            <ProfileIcon alt="Profile Button" img={user.picture} />
          </Panel.VisibleComponent>
          <Panel.HiddenComponent
            headerElement={<div className="hidden-header">@username</div>}
          >
            <PanelItem onClick={() => console.log("Clicked on Share")}>
              <PreferencesIcon title="Preferences Icon" />
              Preferences
            </PanelItem>
            <PanelItem onClick={toggleThemes}>
              <TorchIcon title="Mode switch icon" />
              <p>{darkTheme ? "Light Mode" : "Dark Mode"}</p>
            </PanelItem>
            <PanelItem onClick={logoutUser}>
              <LogoutIcon title="Logout icon" /> Logout
            </PanelItem>
          </Panel.HiddenComponent>
        </Panel>
      </div>
    </header>
  );
};

export default Header;
