import React, { useState } from "react";
import clsx from "clsx";
import { ReactComponent as HomeIcon } from "../../assets/icons/homeIcon.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as FriendsIcon } from "../../assets/icons/friends.svg";
import { ReactComponent as SiteLogo } from "../../assets/icons/site-logo.svg";
import "../../styles/Navbar.scss";

const navItems = [
  {
    Icon: HomeIcon,
    alt: "Home Icon",
    title: "Home"
  },
  {
    Icon: SearchIcon,
    alt: "Search Icon",
    title: "Search"
  },
  {
    Icon: FriendsIcon,
    alt: "Friends Icon",
    title: "Friends"
  }
];

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(navItems[0].title);
  const onNavItemClick = e => setActiveItem(e.currentTarget.dataset.key);
  return (
    <nav className="navbar">
      <SiteLogo className="logo" />
      {navItems.map(({ Icon, alt, title }) => (
        <div
          className={clsx({
            navbar__item: true,
            "navbar__item--active": activeItem === title
          })}
          key={title}
          data-key={title}
          onClick={onNavItemClick}
        >
          <Icon className="navbar__icon" title={alt} />
          <span className="navbar__item__title">{title}</span>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
