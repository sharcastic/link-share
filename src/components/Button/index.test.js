import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./index";

test("Test to render a Button", async () => {
  render(<Button>Text</Button>);
  const element = screen.getByText("Text");
  userEvent.click(element);
  expect(element).toBeInTheDocument();
});
