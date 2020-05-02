import React, { useState } from "react";
import { string, func } from "prop-types";
import clsx from "clsx";

import { ReactComponent as DefaultPersonIcon } from "../../assets/icons/default-person.svg";

import "../../styles/ProfileIcon.scss";

const ProfileIcon = ({ img, className, alt, onClick }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={clsx("profile-icon", className)} onClick={onClick}>
      {loading && <DefaultPersonIcon title={alt} />}
      <img
        src={img}
        alt={alt}
        className={clsx({ icon: true, hide: loading })}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

ProfileIcon.propTypes = {
  img: string,
  className: string,
  alt: string,
  onClick: func
};

ProfileIcon.defaultProps = {
  img: "",
  className: "",
  alt: "Profile Icon",
  onClick: () => {}
};

export default ProfileIcon;
