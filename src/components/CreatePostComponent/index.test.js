import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  prettyDOM,
  getAllByPlaceholderText
} from "@testing-library/react";
import { Provider } from "urql";
import { never } from "wonka";
import CreatePostComponent from "./index";
import { element } from "prop-types";

const mockClient = {
  executeQuery: jest.fn(() => never),
  executeMutation: jest.fn(() => never),
  executeSubscription: jest.fn(() => never)
};

/*
<Provider value={mockClient}>
      <CreatePostComponent />
    </Provider>
*/

jest.mock("../../utils/Auth0", () => ({
  useAuth0: jest
    .fn()
    .mockReturnValueOnce({})
    .mockReturnValue({ user: { sub: 0 } })
}));

jest.mock("../../utils/network", () => ({
  callServerless: jest.fn().mockReturnValue(
    new Promise(resolve =>
      resolve({
        description: "Description",
        image: "/public/logo",
        title: "Title",
        responseReceived: true
      })
    )
  )
}));

it("Renders the CreatePostComponent and checks for LinkPreview Title", async () => {
  const { getByPlaceholderText, getByText, getByTestId } = render(
    <CreatePostComponent />
  );
  const linkTextElement = getByPlaceholderText("Type a link or paste a link");
  fireEvent.change(linkTextElement, {
    target: { value: "https://google.com" }
  });
  const descriptionElement = getByPlaceholderText(
    "Say something about what you’re sharing"
  );
  fireEvent.change(descriptionElement, {
    target: { value: "new description" }
  });
  fireEvent.blur(linkTextElement);
  waitFor(() => {
    const el = getByText("Title");
    console.log(prettyDOM(getByTestId("CreatePost")));
    expect(el).toBeInTheDocument();
  });
});
