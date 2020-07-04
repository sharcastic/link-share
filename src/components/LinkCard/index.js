import React, { useState, useContext } from "react";
import { string, shape, bool, number } from "prop-types";
import clsx from "clsx";
import { useToasts } from "react-toast-notifications";
import ProfileIcon from "../ProfileIcon";
import Panel, { PanelItem } from "../../components/OptionsPanel";
import LinkCardLoader from "../LinkCardLoader";
import PostPreview from "../PostPreview";
import LinkCardPanel from "../LinkCardPanel";

import { getTimeAndDate } from "../../utils/methods";
import { useAuth0 } from "../../utils/Auth0";
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
  cardData: {
    description,
    link,
    id,
    author,
    created_at,
    post_tagged_users = [],
    comments = [],
  },
  previewData,
  fromModal,
  selectedPanel,
}) => {
  const {
    changeEditingPost,
    isMobile,
    setDesktopSelectedPost,
    deletePost,
    addComment,
  } = useContext(ApplicationContext);
  const { user = {} } = useAuth0();
  const { addToast } = useToasts();

  const [extraPanelSelected, setExtraPanel] = useState(selectedPanel);

  const onPostDelete = () => {
    deletePost(id);
  };
  const onEditPostClick = () => {
    changeEditingPost(id);
  };
  const toggleExtraPanel = (panel) => () => {
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
  const onAddComment = (content) => {
    return addComment(content, id);
  };

  const [time, date] = getTimeAndDate(created_at);

  return (
    <div className="post__container">
      <div className="post">
        <div>
          {previewData === undefined && <LinkCardLoader />}
          <PostPreview
            linkURL={link}
            className={clsx({ hide: previewData === undefined })}
            preview={previewData}
            previewTop={
              <div className="details-top">
                <div className="creationDetails">
                  <ProfileIcon
                    className="creationDetails__authorIcon"
                    img={author.display_picture_url}
                  />
                  <div className="creationDetails__text">
                    <span className="creationDetails__text__authorName">
                      {author.name}
                    </span>
                    <span className="creationDetails__text__timeCreated">
                      {`at ${time} on ${date}`}
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
                    <ul>
                      <PanelItem
                        onClick={() => console.log("Clicked on Share")}
                      >
                        <ShareIcon title="Share Icon" />
                        Share Post
                      </PanelItem>
                      {user.sub === author.id && (
                        <>
                          <PanelItem onClick={onEditPostClick}>
                            <EditIcon title="Edit Icon" />
                            Edit Post
                          </PanelItem>
                          <PanelItem onClick={onPostDelete}>
                            <DeleteIcon title="Delete Icon" />
                            Delete Post
                          </PanelItem>
                        </>
                      )}
                    </ul>
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
              <div className="link-info__url__text">{link}</div>
              <CopyIcon
                title="Copy Icon"
                className="link-info__url__copyIcon"
                onClick={() =>
                  navigator.clipboard.writeText(link).then(() => {
                    addToast(<p>Copied to Clipboard!</p>, {
                      appearance: "info",
                    });
                  })
                }
              />
            </div>
            <div className="link-info__description">{description}</div>
          </div>
          <div className="post-iconRow">
            <div className="iconRow__left">
              <div
                className={clsx({
                  iconRow__left__comments: true,
                  active: extraPanelSelected === "comments",
                })}
                onClick={toggleExtraPanel("comments")}
              >
                <CommentIcon title="Comment Icon" className="comments__icon" />
                <span className="comments__number">{comments.length}</span>
              </div>
              <div
                className={clsx({
                  iconRow__left__tags: true,
                  active: extraPanelSelected === "tags",
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
                  active: extraPanelSelected === "friends",
                })}
                onClick={toggleExtraPanel("friends")}
              >
                <div className="friends__iconContainer">
                  {post_tagged_users
                    .slice(0, 3)
                    .map(({ user: { display_picture_url } }) => (
                      <ProfileIcon img={display_picture_url} />
                    ))}
                </div>
                <span className="friends__number">
                  {post_tagged_users.length !== 0 && post_tagged_users.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={clsx({
            post__bottom__tabarea: true,
            hide: !extraPanelSelected,
          })}
        >
          <LinkCardPanel
            panelSelected={extraPanelSelected}
            comments={comments}
            addComment={onAddComment}
            users={post_tagged_users}
          />
        </div>
      </div>
    </div>
  );
};

LinkCard.propTypes = {
  cardData: shape({
    description: string,
    link: string,
    id: number,
    created_at: string,
    author: shape({
      id: string,
      name: string,
    }),
  }).isRequired,
  previewData: shape({ imgSrc: string, description: string, title: string }),
  fromModal: bool,
  selectedPanel: string,
};

LinkCard.defaultProps = {
  fromModal: false,
  selectedPanel: "",
  previewData: {},
};

export default LinkCard;
