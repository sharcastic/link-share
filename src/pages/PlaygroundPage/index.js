import React, { useRef, useState, useContext } from "react";
import clsx from "clsx";

import "../../styles/Playground.scss";
import { useAuth0 } from "../../utils/Auth0";
import { ReactComponent as NotificationIcon } from "../../assets/icons/notifications.svg";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo-mobile.svg";
import { ReactComponent as PreferencesIcon } from "../../assets/icons/preferences.svg";
import { ReactComponent as TorchIcon } from "../../assets/icons/torch.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import LinkCard from "../../components/LinkCard";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";
import CreatePost from "../../components/CreatePost";

import ApplicationContext from "../../context/ApplicationContext/ApplicationContext";

const PlaygroundPage = () => {
  const { darkTheme, toggleDarkTheme } = useContext(ApplicationContext);
  const { user = {}, logoutUser } = useAuth0();
  const refNoti = useRef();
  const refProfile = useRef();
  const [isNotiOpen, setNotiOpen] = useState(false);
  const toggleNotificationsOpen = () => setNotiOpen(!isNotiOpen);
  useOnClickOutside(refNoti, () => setNotiOpen(false));
  const [isProfileOpen, setProfileOpen] = useState(false);
  const toggleProfileOpen = () => setProfileOpen(!isProfileOpen);
  useOnClickOutside(refProfile, () => setProfileOpen(false));
  const toggleThemes = () => {
    toggleDarkTheme();
    toggleProfileOpen();
  };

  return (
    <div className="playground-page">
      <header>
        <div className="header-left">
          <LogoIcon className="mobile-icon" title="Logo" />
          <h2 className="header-title">Playground</h2>
        </div>
        <div className="header-right">
          <div className="notifications" ref={refNoti}>
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
                  className="notifications__panel__list__item"
                  onClick={toggleNotificationsOpen}
                >
                  <p className="notifications__panel__list__item__text">
                    First Item
                  </p>
                  <div className="notifications__panel__list__item__buttonSection">
                    <Button
                      className="notifications__panel__list__item__buttonSection__button--ignore"
                      type="plain"
                    >
                      Ignore
                    </Button>
                    <Button className="notifications__panel__list__item__buttonSection__button--accept">
                      Accept
                    </Button>
                  </div>
                </li>
                <li
                  className="notifications__panel__list__item"
                  onClick={toggleNotificationsOpen}
                >
                  <p className="notifications__panel__list__item__text">
                    Second Item
                  </p>
                  <div className="notifications__panel__list__item__buttonSection">
                    <Button
                      className="notifications__panel__list__item__buttonSection__button--mark"
                      type="plain"
                    >
                      Mark as Read
                    </Button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile" ref={refProfile}>
            <img
              src={user.picture}
              alt="Profile Button"
              onClick={toggleProfileOpen}
            />

            <div
              className={clsx({ profile__panel: true, hide: !isProfileOpen })}
            >
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
                <li
                  className="profile__panel__list__item"
                  onClick={toggleThemes}
                >
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
      <main>
        <LinkCard imgSrc="https://techcrunch.com/wp-content/themes/techcrunch-2017/images/opengraph-default.png" />
        <LinkCard imgSrc="https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png" />
        <LinkCard />
      </main>
      <div className="hidden-container">
        <CreatePost specialBehaviour />
      </div>
    </div>
  );
};

export default PlaygroundPage;
