import React from "react";
import ContentLoader from "react-content-loader";
import "../../styles/LinkCardLoader.scss";

const LinkCardLoader = () => (
  <div className="link-loader">
    <div className="upper-loader">
      <ContentLoader
        speed={1}
        width="100%"
        height={150}
        viewBox="0 0 350 150"
        foregroundColor="#AAAAAA"
      >
        <circle cx="12" cy="24" r="12" left="" />
        <rect x="30" y="12" rx="3" ry="3" width="80" height="10" />
        <rect x="30" y="26" rx="3" ry="3" width="105" height="10" />
        <rect x="00" y="110" rx="3" ry="3" width="210" height="10" />
        <rect x="00" y="125" rx="3" ry="3" width="320" height="10" />
      </ContentLoader>
    </div>
  </div>
);

/*
<ContentLoader
      speed={1}
      width="100%"
      height="130"
      viewBox="0 0 350 130"
      // backgroundColor="grey"
      foregroundColor="#AAAAAA"
    >
      <rect x="10" y="16" rx="3" ry="3" width="320" height="10" />
      <rect x="10" y="60" rx="3" ry="3" width="320" height="10" />
      <rect x="10" y="75" rx="3" ry="3" width="220" height="10" />
    </ContentLoader>
*/

export default LinkCardLoader;
