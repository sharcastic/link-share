import React from "react";
import "../../styles/Playground.scss";
import { useAuth0 } from "../../utils/Auth0";
import { ReactComponent as NotificationIcon } from "../../assets/notifications.svg";
import { ReactComponent as DefaultPersonIcon } from "../../assets/default-person.svg";
import { ReactComponent as OptionsIcon } from "../../assets/options.svg";
import { ReactComponent as HttpsIcon } from "../../assets/https.svg";
import { ReactComponent as CopyIcon } from "../../assets/copy.svg";
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
      <main>
        <div className="post">
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
            />
          </div>
          <div className="post__info">
            <div className="post__info__url">
              <HttpsIcon
                title="HTTPS Icon"
                className="post__info__url__httpsIcon"
              />
              <div className="post__info__url__text">
                <p>
                  https://techcrunch.com/2020/04/17/gm-delivers-first-ventilators-under-30000-unit-government-contract/
                </p>
              </div>
              <CopyIcon
                title="Copy Icon"
                className="post__info__url__copyIcon"
              />
            </div>
            <div className="post__info__description">Description</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaygroundPage;
