import React, { useRef, useState } from "react";
import clsx from "clsx";

import "../../styles/Playground.scss";
import { useAuth0 } from "../../utils/Auth0";
import { ReactComponent as NotificationIcon } from "../../assets/notifications.svg";
import { ReactComponent as LogoIcon } from "../../assets/logo-mobile.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import LinkCard from "../../components/LinkCard";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

// import { callServerless } from "../../utils/network";

const PlaygroundPage = () => {
  const { user = {} } = useAuth0();
  const ref = useRef();
  const [isTabOpen, setTabOpen] = useState(false);
  const [addLinkText, setLinkText] = useState("");
  useOnClickOutside(ref, () => setTabOpen(false));

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

  const onLinkTextChange = text => setLinkText(text);
  return (
    <div className="playground-page">
      <header>
        <div className="header-left">
          <LogoIcon className="mobile-icon" title="Logo" />
          <h2 className="header-title">Playground</h2>
        </div>
        <div className="header-right">
          <div className="notifications" ref={ref}>
            <IconButton
              Icon={NotificationIcon}
              title="Notifications"
              className="notifications__button"
              onClick={() => setTabOpen(!isTabOpen)}
            />
            <span className="notifications__unreadIndicator" />
            <div
              className={clsx({ notifications__panel: true, hide: !isTabOpen })}
            >
              <div className="notifications__panel__header">
                <Button type="plain">View All</Button>
                <span>Updates</span>
              </div>
              <ul className="notifications__panel__list">
                <li className="notifications__panel__list__item">
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
                <li className="notifications__panel__list__item">
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
          <button className="profile-button">
            <img src={user.picture} alt="Profile Button" />
          </button>
        </div>
      </header>
      <main>
        <div
          className={clsx({ createPost: true /* show: addLinkText !== "" */ })}
        >
          Details!
        </div>
        <div>
          <LinkCard imgSrc="https://techcrunch.com/wp-content/themes/techcrunch-2017/images/opengraph-default.png" />
          <LinkCard imgSrc="https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png" />
          <LinkCard />
        </div>
      </main>
      <div className="hidden-container">
        <div className={clsx({ brighten: true, show: addLinkText !== "" })} />
        {addLinkText === "" ? (
          <TextInput
            value={addLinkText}
            placeholder="Type or paste a link here"
            className="addLink-textInput"
            onChange={onLinkTextChange}
          />
        ) : (
          <div className="createPost">
            <TextInput
              value={addLinkText}
              className="createPost__linkTextbox"
              onChange={onLinkTextChange}
            />
            <div className="createPost__bottom">
              <Button type="plain">Cancel</Button>
              <Button type="primary">Save Post</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaygroundPage;
