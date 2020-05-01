import React, { useState } from "react";
import clsx from "clsx";

import { navItems } from "../../constants";
import { ReactComponent as SiteLogo } from "../../assets/icons/site-logo.svg";
import "../../styles/Navbar.scss";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(navItems[0].title);
  const onNavItemClick = e => setActiveItem(e.currentTarget.dataset.key);
  return (
    <nav className="navbar">
      <SiteLogo className="logo" />
      {navItems.map(({ Icon, alt, title }) => (
        <div
          className={clsx({
            "nav-item": true,
            "nav-item--active": activeItem === title
          })}
          key={title}
          data-key={title}
          onClick={onNavItemClick}
        >
          <Icon className="nav-icon" title={alt} />
          <span className="nav-item__title">{title}</span>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
