import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PillLabel from "./index";

test("Test to render PillLabel", () => {
  render(<PillLabel value="value" id={"1"} removable />);
  userEvent.click(screen.getByTitle("remove icon"));

  expect(screen.getByText("value")).toBeInTheDocument();
});

test("Test the remove event handler", () => {
  const fn = jest.fn();
  render(<PillLabel value="value" id={"1"} removable onRemove={fn} />);
  userEvent.click(screen.getByTitle("remove icon"));
  expect(fn).toHaveBeenCalledWith("1");
});
