import React, { useState, useContext } from "react";
import { string, shape, bool } from "prop-types";
import clsx from "clsx";
import { useToasts } from "react-toast-notifications";

import TextInput from "../TextInput";
import ProfileIcon from "../ProfileIcon";
import Panel, { PanelItem } from "../../components/OptionsPanel";
import LinkCardLoader from "../LinkCardLoader";
import PostPreview from "../PostPreview";
import LinkCardPanel from "../LinkCardPanel";

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

  const onEditPostClick = () => {
    changeEditingPost(id);
  };
  const [extraPanelSelected, setExtraPanel] = useState(selectedPanel);
  const toggleExtraPanel = panel => () => {
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
          {previewData === undefined && <LinkCardLoader />}
          <PostPreview
            linkURL={url}
            className={clsx({ hide: previewData === undefined })}
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
                <Panel>
                  <Panel.VisibleComponent>
                    <OptionsIcon
                      title="Options Icon"
                      className="options-icon"
                    />
                  </Panel.VisibleComponent>
                  <Panel.HiddenComponent>
                    <PanelItem onClick={() => console.log("Clicked on Share")}>
                      <ShareIcon title="Share Icon" />
                      Share Post
                    </PanelItem>
                    <PanelItem onClick={onEditPostClick}>
                      <EditIcon title="Edit Icon" />
                      Edit Post
                    </PanelItem>
                    <PanelItem
                      onClick={() => console.log("Clicked on Delete!")}
                    >
                      <DeleteIcon title="Delete Icon" />
                      Delete Post
                    </PanelItem>
                  </Panel.HiddenComponent>
                </Panel>
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
          <LinkCardPanel panelSelected={extraPanelSelected} />
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
  previewData: shape({ imgSrc: string, description: string, title: string }),
  fromModal: bool,
  selectedPanel: string
};

LinkCard.defaultProps = {
  fromModal: false,
  selectedPanel: "",
  previewData: {}
};

export default LinkCard;
