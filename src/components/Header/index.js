import React, { useRef, useState, useContext } from "react";
import clsx from "clsx";

import { ReactComponent as NotificationIcon } from "../../assets/icons/notifications.svg";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo-mobile.svg";
import { ReactComponent as PreferencesIcon } from "../../assets/icons/preferences.svg";
import { ReactComponent as TorchIcon } from "../../assets/icons/torch.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import ProfileIcon from "../../components/ProfileIcon";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";

import { useAuth0 } from "../../utils/Auth0";
import ApplicationContext from "../../context/ApplicationContext/ApplicationContext";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import "../../styles/Header.scss";

const Header = () => {
  const refNotification = useRef();
  const refProfile = useRef();

  const { user = {}, logoutUser } = useAuth0();
  const { darkTheme, toggleDarkTheme } = useContext(ApplicationContext);

  const [isNotiOpen, setNotiOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const toggleNotificationsOpen = () => setNotiOpen(!isNotiOpen);
  useOnClickOutside(refNotification, () => setNotiOpen(false));
  const toggleProfileOpen = () => setProfileOpen(!isProfileOpen);
  useOnClickOutside(refProfile, () => setProfileOpen(false));
  const toggleThemes = () => {
    toggleDarkTheme();
    toggleProfileOpen();
  };

  return (
    <header>
      <div className="header-left">
        <LogoIcon className="mobile-icon" title="Logo" />
        <h2 className="header-title">Playground</h2>
      </div>
      <div className="header-right">
        <div className="notifications" ref={refNotification}>
          <IconButton
            Icon={NotificationIcon}
            title="Notifications"
            className="notifications__button"
            onClick={toggleNotificationsOpen}
          />
          <span className="notifications__unreadIndicator" />
          <div
            className={clsx({
              notifications__panel: true,
              hide: !isNotiOpen
            })}
          >
            <div className="notifications__panel__header">
              <Button type="plain" onClick={toggleNotificationsOpen}>
                View All
              </Button>
              <span>Updates</span>
            </div>
            <ul className="notifications__panel__list">
              <li
                className="notifications-item"
                onClick={toggleNotificationsOpen}
              >
                <p className="notifications-item__text">First Item</p>
                <div className="notifications-item__buttonSection">
                  <Button className="notification-button--ignore" type="plain">
                    Ignore
                  </Button>
                  <Button className="notification-button--accept">
                    Accept
                  </Button>
                </div>
              </li>
              <li
                className="notifications-item"
                onClick={toggleNotificationsOpen}
              >
                <p className="notifications-item__text">Second Item</p>
                <div className="notifications-item__buttonSection">
                  <Button className="notification-button--mark" type="plain">
                    Mark as Read
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile" ref={refProfile}>
          <ProfileIcon
            alt="Profile Button"
            onClick={toggleProfileOpen}
            img={user.picture}
          />

          <div className={clsx({ profile__panel: true, hide: !isProfileOpen })}>
            <div className="profile__panel__header">
              <span>@username</span>
            </div>
            <ul className="profile__panel__list">
              <li
                className="profile__panel__list__item"
                onClick={toggleProfileOpen}
              >
                <button>
                  <PreferencesIcon />
                  Preferences
                </button>
              </li>
              <li className="profile__panel__list__item" onClick={toggleThemes}>
                <button>
                  <TorchIcon />
                  <p>{darkTheme ? "Light Mode" : "Dark Mode"}</p>
                </button>
              </li>
              <li className="profile__panel__list__item" onClick={logoutUser}>
                <button>
                  <LogoutIcon />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
