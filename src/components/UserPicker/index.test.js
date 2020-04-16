import React from "react";
import { render } from "@testing-library/react";
import UserPicker from "./index";

const placeholder = "Testing";
it("Renders the UserPicker", () => {
  const { getByText } = render(<UserPicker placeholder={placeholder} />);
  const element = getByText(placeholder);
  expect(element).toBeInTheDocument();
});
