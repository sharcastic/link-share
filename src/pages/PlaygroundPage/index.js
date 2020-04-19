import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ContentLoader from "react-content-loader";
import "../../styles/Playground.scss";
import { useAuth0 } from "../../utils/Auth0";
import { ReactComponent as NotificationIcon } from "../../assets/notifications.svg";
import { ReactComponent as DefaultPersonIcon } from "../../assets/default-person.svg";
import { ReactComponent as OptionsIcon } from "../../assets/options.svg";
import { ReactComponent as HttpsIcon } from "../../assets/https.svg";
import { ReactComponent as CopyIcon } from "../../assets/copy.svg";
import { ReactComponent as CommentIcon } from "../../assets/comment.svg";
import { ReactComponent as TagIcon } from "../../assets/tag.svg";
import IconButton from "../../components/IconButton";

import { callServerless } from "../../utils/network";

const Loader = () => (
  <div className="loader">
    <div className="upper-loader">
      <ContentLoader
        speed={1}
        width={350}
        height={150}
        viewBox="0 0 350 150"
        // backgroundColor="grey"
        foregroundColor="#AAAAAA"
      >
        <circle cx="22" cy="24" r="12" left="" />
        <rect x="40" y="12" rx="3" ry="3" width="80" height="10" />
        <rect x="40" y="26" rx="3" ry="3" width="105" height="10" />
        <rect x="10" y="110" rx="3" ry="3" width="210" height="10" />
        <rect x="10" y="125" rx="3" ry="3" width="320" height="10" />
      </ContentLoader>
    </div>
    <ContentLoader
      speed={1}
      width={350}
      height={130}
      viewBox="0 0 350 130"
      // backgroundColor="grey"
      foregroundColor="#AAAAAA"
    >
      <rect x="10" y="16" rx="3" ry="3" width="320" height="10" />
      <rect x="10" y="60" rx="3" ry="3" width="320" height="10" />
      <rect x="10" y="75" rx="3" ry="3" width="220" height="10" />
    </ContentLoader>
  </div>
);

const PlaygroundPage = () => {
  const { user = {} } = useAuth0();
  const [imageLoading, setLoading] = useState(true);
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
        {imageLoading && <Loader />}
        <div className={clsx({ post: true, hide: imageLoading })}>
          <div className="post__preview">
            <div className="post__preview__background" />
            <div className="post__preview__details">
              <div className="post__preview__details__top">
                <div className="post__preview__details__top__creationDetails">
                  <DefaultPersonIcon className="post__preview__details__top__creationDetails__authorIcon" />
                  <div className="post__preview__details__top__creationDetails__text">
                    <span className="post__preview__details__top__creationDetails__text__authorName">
                      Author name
                    </span>
                    <span className="post__preview__details__top__creationDetails__text__timeCreated">
                      at 14:07 on 01 Apr 2020
                    </span>
                  </div>
                </div>
                <div>
                  <OptionsIcon
                    title="Options Icon"
                    className="post__preview__details__top__options"
                  />
                </div>
              </div>
              <div className="post__preview__details__linkDetails">
                <span className="post__preview__details__linkDetails__title">
                  Website Title
                </span>
                <span className="post__preview__details_linkDetails__description">
                  Website Description
                </span>
              </div>
            </div>
            <img
              src="https://techcrunch.com/wp-content/themes/techcrunch-2017/images/opengraph-default.png"
              alt="backdrop"
              onLoad={() => setLoading(false)}
            />
          </div>
          <div className="post__bottom">
            <div className="post__bottom__info">
              <div className="post__bottom__info__url">
                <HttpsIcon
                  title="HTTPS Icon"
                  className="post__bottom__info__url__httpsIcon"
                />
                <div className="post__bottom__info__url__text">
                  https://techcrunch.com/2020/04/17/gm-delivers-first-ventilators-under-30000-unit-government-contract/
                </div>
                <CopyIcon
                  title="Copy Icon"
                  className="post__bottom__info__url__copyIcon"
                />
              </div>
              <div className="post__bottom__info__description">
                Title or Description for the link shared which can go into
                multiple lines
              </div>
            </div>
            <div className="post__bottom__IconRow">
              <div className="post__bottom__IconRow__left">
                <div className="post__bottom__IconRow__left__comments">
                  <CommentIcon
                    title="Comment Icon"
                    className="post__bottom__IconRow__left__comments_icon"
                  />
                  <span className="post__bottom__IconRow__left__comments_number">
                    5
                  </span>
                </div>
                <div className="post__bottom__IconRow__left__friends">
                  <DefaultPersonIcon className="post__bottom__IconRow__left__friends_icon" />
                  <span className="post__bottom__IconRow__left__friends_number">
                    1
                  </span>
                </div>
              </div>
              <div className="post__bottom__IconRow__right">
                <div className="post__bottom__IconRow__right__tags">
                  <TagIcon
                    className="post__bottom__IconRow__right__tags_icon"
                    title="Tag Icon"
                  />
                  <span className="post__bottom__IconRow__right__tags_number">
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaygroundPage;
