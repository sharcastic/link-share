import React from "react";
import { render } from "@testing-library/react";
import Textbox from "./index";

const placeholder = "Testing";
it("Renders the Textbox", () => {
  const { getByPlaceholderText } = render(
    <Textbox placeholder={placeholder} />
  );
  const element = getByPlaceholderText(placeholder);
  expect(element).toBeInTheDocument();
});
