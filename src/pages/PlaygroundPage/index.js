import React, { useRef, useState } from "react";
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
import ThemeSwitcher from "../../components/ThemeSwitcher"

const PlaygroundPage = () => {
  const { user = {}, logoutUser } = useAuth0();
  const refNoti = useRef();
  const refProfile = useRef();
  const [isNotiOpen, setNotiOpen] = useState(false);
  useOnClickOutside(refNoti, () => setNotiOpen(false));
  const [isProfileOpen, setProfileOpen] = useState(false);
  useOnClickOutside(refProfile, () => setProfileOpen(false));

  /* useEffect(() => {
    const fn = async () => {
      const response = await callServerless([
        "not a url",
        "https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/",
        "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
        "https://medium.com/@codebyamir/a-web-developers-guide-to-browser-caching-cc41f3b73e7c"
      ]);
      console.log("RESPONSE IN USEEFFECT", response);
    };
    fn();
  }, []); */

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
              onClick={() => setNotiOpen(!isNotiOpen)}
            />
            <span className="notifications__unreadIndicator" />
            <div className={clsx({ notifications__panel: true, hide: !isNotiOpen })} >
              <div className="notifications__panel__header">
                <Button type="plain" onClick={() => setNotiOpen(!isNotiOpen)}>View All</Button>
                <span>Updates</span>
              </div>
              <ul className="notifications__panel__list">
                <li className="notifications__panel__list__item" onClick={() => setNotiOpen(!isNotiOpen)}>
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
                <li className="notifications__panel__list__item" onClick={() => setNotiOpen(!isNotiOpen)}>
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
          <button className="profile" ref={refProfile}>
            <img 
              src={user.picture} 
              alt="Profile Button" 
              onClick={() => setProfileOpen(!isProfileOpen)}
            />
            
            <div className={clsx({ profile__panel: true, hide: !isProfileOpen })} >
            <div className="profile__panel__header">
                <span>@username</span>
              </div>
                  <ul className="profile__panel__list">
                    <li className="profile__panel__list__item" onClick={() => setProfileOpen(!isProfileOpen)}>
                      <button className="profile__panel__list__item__text">
                      <span> <PreferencesIcon/> </span>
                        Preferences
                      </button>
                    </li>
                    <li className="profile__panel__list__item" onClick={() => setProfileOpen(!isProfileOpen)}>
                      <button className="profile__panel__list__item__text">
                        <span> <TorchIcon/> </span>
                        <ThemeSwitcher/>
                      </button>
                    </li>
                    <li className="profile__panel__list__item" onClick={logoutUser}>
                      <button className="profile__panel__list__item__text">
                      <span> <LogoutIcon/> </span>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
          </button>
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
