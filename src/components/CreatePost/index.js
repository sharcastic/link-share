import React, { useState } from "react";
import { bool } from "prop-types";
import clsx from "clsx";

import { callServerless } from "../../utils/network";

import Button from "../Button";
import TextInput from "../TextInput";
import PostPreview from "../PostPreview";

import "../../styles/CreatePost.scss";

const CreatePost = ({ specialBehaviour }) => {
  const [linkText, setLinkText] = useState("");
  const [preview, setPreview] = useState({});
  const getPreviewDetails = async (text = undefined) => {
    setPreview({ responseReceived: false });
    const url = text ? text : linkText;
    const response = await callServerless([url]);
    if (response) {
      setPreview(response[url]);
    }
  };
  const onBlur = () => getPreviewDetails();
  const onLinkTextChange = text => setLinkText(text);
  return (
    <div
      className={clsx({
        createPost: true,
        "createPost--specialBehaviour": specialBehaviour,
        "createPost--specialBehaviour--showPanel": specialBehaviour && linkText
      })}
    >
      {preview.responseReceived && (
        <div className="createPost__post-info">
          <PostPreview src="https://techcrunch.com/wp-content/themes/techcrunch-2017/images/opengraph-default.png" />
          This is the post preview!
        </div>
      )}
      <TextInput
        value={linkText}
        onChange={onLinkTextChange}
        onBlur={onBlur}
        className="createPost__linkTextbox"
        placeholder="Type or paste a link here"
      />
      <div className="createPost__bottom">
        <Button type="plain">Cancel</Button>
        <Button type="primary">Save Post</Button>
      </div>
    </div>
  );
};

CreatePost.propTypes = {
  specialBehaviour: bool
};

CreatePost.defaultProps = {
  specialBehaviour: false
};

//<div className="createPost__post-info__post-preview"></div>

export default CreatePost;
