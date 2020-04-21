import React from "react";

import "../../styles/Playground.scss";
import { useAuth0 } from "../../utils/Auth0";
import { ReactComponent as NotificationIcon } from "../../assets/notifications.svg";

import LinkCard from "../../components/LinkCard";
import IconButton from "../../components/IconButton";

// import { callServerless } from "../../utils/network";

const PlaygroundPage = () => {
  const { user = {} } = useAuth0();

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
      <main>
        <LinkCard imgSrc="https://techcrunch.com/wp-content/themes/techcrunch-2017/images/opengraph-default.png" />
        <LinkCard imgSrc="https://developer.mozilla.org/en-US/docs/Web/CSS/minmax" />
        <LinkCard imgSrc="https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png" />
        <LinkCard />
      </main>
    </div>
  );
};

// imgSrc="https://miro.medium.com/max/1200/1*_tTA7GNSjhkEWj-BZzscqA.jpeg"
export default PlaygroundPage;
