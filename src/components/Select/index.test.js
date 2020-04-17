import React from "react";
import { render } from "@testing-library/react";
import Select from "./index";

it("Renders the Select", () => {
  const { getByTestId } = render(<Select />);
  const element = getByTestId("Select");
  expect(element).toBeInTheDocument();
});
