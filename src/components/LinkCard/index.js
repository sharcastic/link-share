import React, { useRef, useState } from "react";
import clsx from "clsx";
import LinkCardLoader from "../LinkCardLoader";
import PostPreview from "../PostPreview";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import { ReactComponent as DefaultPersonIcon } from "../../assets/icons/default-person.svg";
import { ReactComponent as OptionsIcon } from "../../assets/icons/options.svg";
import { ReactComponent as HttpsIcon } from "../../assets/icons/https.svg";
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as TagIcon } from "../../assets/icons/tag.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as ShareIcon } from "../../assets/icons/share.svg";
import "../../styles/LinkCard.scss";

const LinkCard = ({ imgSrc }) => {
  const [imageLoading, setLoading] = useState(true);
  const onLoad = () => setLoading(false);
  const ref = useRef();
  const [isTabOpen, setTabOpen] = useState(false);
  useOnClickOutside(ref, () => setTabOpen(false));
  const [extraPanelSelected, setExtraPanel] = useState();
  const toggleExtraPanel = panel => () => {
    if (extraPanelSelected === panel) {
      setExtraPanel();
    } else {
      setExtraPanel(panel);
    }
  };

  return (
    <div className="post__container">
      {imageLoading && <LinkCardLoader />}
      <div className={clsx({ post: true, hide: imageLoading })}>
        <PostPreview
          onLoad={onLoad}
          preview={{ image: imgSrc }}
          previewTop={
            <div className="post-preview__details__top">
              <div className="post-preview__details__top__creationDetails">
                <DefaultPersonIcon className="post-preview__details__top__creationDetails__authorIcon" />
                <div className="post-preview__details__top__creationDetails__text">
                  <span className="post-preview__details__top__creationDetails__text__authorName">
                    Author name
                  </span>
                  <span className="post-preview__details__top__creationDetails__text__timeCreated">
                    at 14:07 on 01 Apr 2020
                  </span>
                </div>
              </div>
              <div className="options">
                <OptionsIcon
                  title="Options Icon"
                  className="options__icon"
                  onClick={() => setTabOpen(!isTabOpen)}
                />
                <div
                  className={clsx({ options__panel: true, hide: !isTabOpen })}
                >
                  <ul className="options__panel__list">
                    <li className="options__panel__list__item">
                      <button className="options__panel__list__item__text">
                        <span>
                          <ShareIcon />
                        </span>
                        Share Post
                      </button>
                    </li>
                    <li className="options__panel__list__item">
                      <button className="options__panel__list__item__text">
                        <span>
                          <EditIcon />
                        </span>
                        Edit Post
                      </button>
                    </li>
                    <li className="options__panel__list__item">
                      <button className="options__panel__list__item__text">
                        <span>
                          <DeleteIcon />
                        </span>
                        Delete Post
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          }
        />
        <div className="post__bottom">
          <div className="post__bottom__info">
            <div className="post__bottom__info__url">
              <HttpsIcon
                title="HTTPS Icon"
                className="post__bottom__info__url__httpsIcon"
              />
              <div className="post__bottom__info__url__text">{imgSrc}</div>
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
              <div
                className={clsx({
                  post__bottom__IconRow__left__comments: true,
                  active: extraPanelSelected === "comments"
                })}
                onClick={toggleExtraPanel("comments")}
              >
                <CommentIcon
                  title="Comment Icon"
                  className="post__bottom__IconRow__left__comments_icon"
                />
                <span className="post__bottom__IconRow__left__comments_number">
                  5
                </span>
              </div>
              <div
                className={clsx({
                  post__bottom__IconRow__left__friends: true,
                  active: extraPanelSelected === "friends"
                })}
                onClick={toggleExtraPanel("friends")}
              >
                <div className="post__bottom__IconRow__left__friends__iconContainer">
                  <DefaultPersonIcon />
                  <DefaultPersonIcon />
                </div>
                <span className="post__bottom__IconRow__left__friends_number">
                  1
                </span>
              </div>
            </div>
            <div className="post__bottom__IconRow__right">
              <div
                className={clsx({
                  post__bottom__IconRow__right__tags: true,
                  active: extraPanelSelected === "tags"
                })}
                onClick={toggleExtraPanel("tags")}
              >
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
        <div
          className={clsx({
            post__bottom__tabarea: true,
            hide: !extraPanelSelected
          })}
        >
          {extraPanelSelected === "comments" && "Comments Tab"}
          {extraPanelSelected === "friends" && "Friends Tab"}
          {extraPanelSelected === "tags" && "Tags Tab"}
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
