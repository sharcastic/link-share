import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "./index";

test("Test to render a Button", async () => {
  render(
    <Modal>
      <div>Content</div>
    </Modal>
  );
  userEvent.click(screen.getByText("Close [X]"));
  expect(screen.getByText("Content")).toBeInTheDocument();
});
