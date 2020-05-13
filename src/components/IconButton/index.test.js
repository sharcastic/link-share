import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import IconButton from "./index";

test("Test to render a Button", async () => {
  render(<IconButton Icon={Logo} title="icon" />);
  const element = screen.getByTitle("icon");
  userEvent.click(element);
  expect(element).toBeInTheDocument();
});
