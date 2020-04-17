import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  prettyDOM,
  getAllByPlaceholderText,
  act
} from "@testing-library/react";
import { Provider } from "urql";
import { never } from "wonka";
import CreatePostComponent from "./index";

const mockClient = {
  // executeQuery: jest.fn(() => never),
  executeMutation: jest.fn(() => never)
  // executeSubscription: jest.fn(() => never)
};

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
  const { getByPlaceholderText, getByText } = render(<CreatePostComponent />);
  const linkTextElement = getByPlaceholderText("Type a link or paste a link");
  fireEvent.change(linkTextElement, {
    target: {
      value: "https://google.com"
    }
  });
  const descriptionElement = getByPlaceholderText(
    "Say something about what you’re sharing"
  );
  fireEvent.change(descriptionElement, {
    target: { value: "new description" }
  });

  act(() => {
    fireEvent.blur(linkTextElement);
  });
  const el = getByText("Title");
  expect(el).toBeInTheDocument();
});

it("Renders the CreatePostComponent in edit mode and clicks on cancel edit", async () => {
  const changeEditedPost = jest.fn();
  const { getByText } = render(
    <CreatePostComponent
      description="description"
      link="https://google.com"
      postID={0}
      changeEditedPost={changeEditedPost}
    />
  );
  const element = getByText("Cancel Editing Post");
  fireEvent.click(element);
  expect(changeEditedPost).toBeCalledWith();
  // expect(element).toBeInTheDocument();
});

it("Renders the CreatePostComponent in edit mode and clicks on delete button", async () => {
  const changeEditedPost = jest.fn();
  const { getByText } = render(
    <Provider value={mockClient}>
      <CreatePostComponent
        description="description"
        link="https://google.com"
        postID={0}
        changeEditedPost={changeEditedPost}
      />
    </Provider>
  );
  const element = getByText("Delete Post");
  fireEvent.click(element);
  expect(mockClient.executeMutation).toBeCalled();
  // expect(changeEditedPost).toBeCalledWith();
  // expect(element).toBeInTheDocument();
});
