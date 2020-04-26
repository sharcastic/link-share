import React, { useState } from "react";
import clsx from "clsx";
import LinkCardLoader from "../LinkCardLoader";
import PostPreview from "../PostPreview";
import { ReactComponent as DefaultPersonIcon } from "../../assets/default-person.svg";
import { ReactComponent as OptionsIcon } from "../../assets/options.svg";
import { ReactComponent as HttpsIcon } from "../../assets/https.svg";
import { ReactComponent as CopyIcon } from "../../assets/copy.svg";
import { ReactComponent as CommentIcon } from "../../assets/comment.svg";
import { ReactComponent as TagIcon } from "../../assets/tag.svg";
import "../../styles/LinkCard.scss";

const LinkCard = ({ imgSrc }) => {
  const [imageLoading, setLoading] = useState(true);
  const onLoad = () => setLoading(false);
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
              <div>
                <OptionsIcon
                  title="Options Icon"
                  className="post-preview__details__top__options"
                />
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
    </div>
  );
};

export default LinkCard;
