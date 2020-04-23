import React, { useEffect, useState, createRef } from "react";
import { func, bool, string } from "prop-types";

import { callServerless } from "../../utils/network";

import Button from "../Button";
import TextInput from "../TextInput";
import TextInputWithRef from "../TextInputWithRef";

const CreatePost = ({ initialLinkText, forwardRef }) => {
  const [isForwardRef] = useState(forwardRef);
  const refToForward = createRef();
  const [linkText, setLinkText] = useState(initialLinkText);
  const [preview, setPreview] = useState({});
  useEffect(() => {
    console.log("from effect", linkText);
    if (
      forwardRef &&
      linkText &&
      linkText.length === 1 &&
      refToForward.current
    ) {
      refToForward.current.focus();
    }
  }, [linkText]);
  const getPreviewDetails = async (text = undefined) => {
    setPreview({ responseReceived: false });
    const url = text ? text : linkText;
    const response = await callServerless([url]);
    if (response) {
      setPreview(response[url]);
    }
  };
  const onBlur = () => getPreviewDetails();
  const onLinkTextChange = e => setLinkText(e.target.value);
  console.log("from render", linkText);
  return (
    <div className="createPost">
      {preview.responseReceived && (
        <div className="post-preview">This is the post preview!</div>
      )}
      {isForwardRef ? (
        <TextInputWithRef
          ref={refToForward}
          value={linkText}
          className="createPost__linkTextbox"
          onChange={onLinkTextChange}
          onBlur={onBlur}
        />
      ) : (
        <TextInput
          value={linkText}
          className="createPost__linkTextbox"
          onChange={onLinkTextChange}
          onBlur={onBlur}
        />
      )}

      <div className="createPost__bottom">
        <Button type="plain">Cancel</Button>
        <Button type="primary">Save Post</Button>
      </div>
    </div>
  );
};

CreatePost.propTypes = {
  initialLinkText: string.isRequired,
  forwardRef: bool
};

CreatePost.defaultProps = {
  forwardRef: false
};

export default CreatePost;
