import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TextArea from './index';

test("Test to render TextArea and to check if onChange is working", () => {
  const fn = jest.fn();
  render(<div><TextArea onChange={fn} value=""/></div>);
  userEvent.type(screen.getByPlaceholderText("Type a title or description for the link you are sharing"), "a");
  expect(screen.getByText("0/100")).toBeInTheDocument();
  expect(fn).toHaveBeenCalledWith("a");
})