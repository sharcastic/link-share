import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MutationObserver from "@sheerun/mutationobserver-shim";

import ProfileIcon from "./index";
window.MutationObserver = MutationObserver;

const imgUrl =
  "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";

test("Test to render Default Profile Icon", async () => {
  render(<ProfileIcon />);
  const element = screen.getByTitle("Profile Icon");
  userEvent.click(element);
  expect(element).toBeInTheDocument();
});

test("Test with an image source", async () => {
  render(<ProfileIcon img={imgUrl} />);
  const iconElement = screen.getByTitle("Profile Icon");
  expect(iconElement).toBeInTheDocument();
  expect(screen.getByAltText("Profile Icon")).toBeInTheDocument();
});
