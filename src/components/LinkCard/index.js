import React, { useRef, useState, useContext, useEffect } from "react";
import { string, shape, bool } from "prop-types";
import clsx from "clsx";
import { useToasts } from "react-toast-notifications";
import LinkCardLoader from "../LinkCardLoader";
import PostPreview from "../PostPreview";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import TextInput from "../TextInput";
import ProfileIcon from "../ProfileIcon";

import ApplicationContext from "../../context/ApplicationContext/ApplicationContext";

import { ReactComponent as OptionsIcon } from "../../assets/icons/options.svg";
import { ReactComponent as HttpsIcon } from "../../assets/icons/https.svg";
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg";
import { ReactComponent as CommentIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as TagIcon } from "../../assets/icons/tag.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as ShareIcon } from "../../assets/icons/share.svg";
import "../../styles/LinkCard.scss";

const LinkCard = ({
  cardData: { postDescription, url, id },
  previewData,
  fromModal,
  selectedPanel
}) => {
  const { changeEditingPost, isMobile, setDesktopSelectedPost } = useContext(
    ApplicationContext
  );
  const { addToast } = useToasts();

  const [imageLoading, setLoading] = useState(true);

  const onLoad = () => setLoading(false);
  const ref = useRef();
  const onEditPostClick = () => {
    changeEditingPost(id);
    setOptionsOpen(false);
  };
  const [isOptionsOpen, setOptionsOpen] = useState(false);

  useOnClickOutside(ref, () => setOptionsOpen(false));
  const [extraPanelSelected, setExtraPanel] = useState(selectedPanel);
  const toggleExtraPanel = panel => () => {
    debugger;
    if (isMobile || fromModal) {
      if (extraPanelSelected === panel) {
        setExtraPanel();
        if (fromModal) {
          setDesktopSelectedPost();
        }
      } else {
        setExtraPanel(panel);
      }
    } else {
      setDesktopSelectedPost(id, panel);
    }
  };

  return (
    <div className="post__container">
      <div className="post">
        <div>
          {imageLoading && <LinkCardLoader />}
          <PostPreview
            linkURL={url}
            className={clsx({ hide: imageLoading })}
            onLoad={onLoad}
            preview={previewData}
            previewTop={
              <div className="details-top">
                <div className="creationDetails">
                  <ProfileIcon className="creationDetails__authorIcon" />
                  <div className="creationDetails__text">
                    <span className="creationDetails__text__authorName">
                      Author name
                    </span>
                    <span className="creationDetails__text__timeCreated">
                      at 14:07 on 01 Apr 2020
                    </span>
                  </div>
                </div>
                <div className="options" ref={ref}>
                  <OptionsIcon
                    title="Options Icon"
                    className="options__icon"
                    onClick={() => setOptionsOpen(!isOptionsOpen)}
                  />
                  <div
                    className={clsx({
                      options__panel: true,
                      hide: !isOptionsOpen
                    })}
                  >
                    <ul className="options__list">
                      <li className="list__item">
                        <button className="list__item__text">
                          <span>
                            <ShareIcon />
                          </span>
                          Share Post
                        </button>
                      </li>
                      <li className="list__item">
                        <button
                          className="list__item__text"
                          onClick={onEditPostClick}
                        >
                          <span>
                            <EditIcon />
                          </span>
                          Edit Post
                        </button>
                      </li>
                      <li className="list__item">
                        <button className="list__item__text">
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
        </div>
        <div className="post__bottom">
          <div className="link-info">
            <div className="link-info__url">
              <HttpsIcon
                title="HTTPS Icon"
                className="link-info__url__httpsIcon"
              />
              <div className="link-info__url__text">{url}</div>
              <CopyIcon
                title="Copy Icon"
                className="link-info__url__copyIcon"
                onClick={() =>
                  navigator.clipboard.writeText(url).then(() => {
                    addToast(<p>Copied to Clipboard!</p>, {
                      appearance: "info"
                    });
                  })
                }
              />
            </div>
            <div className="link-info__description">{postDescription}</div>
          </div>
          <div className="post-iconRow">
            <div className="iconRow__left">
              <div
                className={clsx({
                  iconRow__left__comments: true,
                  active: extraPanelSelected === "comments"
                })}
                onClick={toggleExtraPanel("comments")}
              >
                <CommentIcon title="Comment Icon" className="comments__icon" />
                <span className="comments__number">5</span>
              </div>
              <div
                className={clsx({
                  iconRow__left__tags: true,
                  active: extraPanelSelected === "tags"
                })}
                onClick={toggleExtraPanel("tags")}
              >
                <TagIcon className="tags__icon" title="Tag Icon" />
                <span className="tags__number">0</span>
              </div>
            </div>
            <div className="iconRow__right">
              <div
                className={clsx({
                  iconRow__right__taggedFriends: true,
                  active: extraPanelSelected === "friends"
                })}
                onClick={toggleExtraPanel("friends")}
              >
                <div className="friends__iconContainer">
                  <ProfileIcon />
                  <ProfileIcon />
                </div>
                <span className="friends__number">1</span>
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
          <div className="tabarea-content">
            {/* {extraPanelSelected === "comments" && "Comments Tab"}
            {extraPanelSelected === "friends" && "Friends Tab"}
            {extraPanelSelected === "tags" && "Tags Tab"} */}
            <div className="comment-item">
              <ProfileIcon className="author-icon" />
              <div className="comment-details">
                <span className="comment-author">Friend name</span>
                <span className="comment-text">Comment content!</span>
              </div>
            </div>
            <div className="comment-item">
              <span className="author-icon">
                <ProfileIcon className="author-icon" />
              </span>
              <div className="comment-details">
                <span className="comment-author">Fricken Chicken</span>
                <span className="comment-text">
                  This another comment to add to the previous one. This can be a
                  longer comment, and that’s ok. Because we can handle it.
                </span>
              </div>
            </div>
          </div>

          <TextInput value="" placeholder="Add a comment" />
        </div>
      </div>
    </div>
  );
};

LinkCard.propTypes = {
  cardData: shape({
    postDescription: string,
    url: string,
    id: string
  }).isRequired,
  previewData: shape({ imgSrc: string, description: string, title: string })
    .isRequired,
  fromModal: bool,
  selectedPanel: string
};

LinkCard.defaultProps = {
  fromModal: false,
  selectedPanel: ""
};

export default LinkCard;
