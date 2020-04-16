import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HomeFeedElement from "./index";

jest.mock("../../utils/Auth0", () => ({
  useAuth0: jest
    .fn()
    .mockReturnValueOnce({})
    .mockReturnValue({ user: { sub: 0 } })
}));

it("Renders the HomeFeedElement with tagged users", () => {
  const post = {
    id: 0,
    link: "https://9gag.com",
    description: "Some website",
    author: { id: 0, name: "Author" },
    post_tagged_users: [{ user: { name: "Tagged User" } }]
  };
  const { getByTestId, getByText } = render(<HomeFeedElement post={post} />);
  const element = getByTestId("HomeFeedItem");
  const sharedText = getByText("Tagged User", { exact: false });
  expect(element).toBeInTheDocument();
  expect(sharedText).toBeInTheDocument();
});

it("Renders the HomeFeedElement with no tagged users", () => {
  const post = {
    id: 0,
    link: "https://9gag.com",
    description: "Some website",
    author: { id: 0, name: "Author" }
    // post_tagged_users: []
  };
  const { getByTestId, getByText } = render(<HomeFeedElement post={post} />);
  const element = getByTestId("HomeFeedItem");
  const sharedText = getByText("Not Shared to anyone else", { exact: false });
  expect(element).toBeInTheDocument();
  expect(sharedText).toBeInTheDocument();
});

it("Renders the HomeFeedElement in Edit mode", () => {
  const post = {
    id: 0,
    link: "https://9gag.com",
    description: "Some website",
    author: { id: 0, name: "Author" },
    post_tagged_users: [{ user: { name: "Tagged User" } }]
  };
  const { getByTestId, getByText } = render(
    <HomeFeedElement post={post} editedPost={0} />
  );
  const element = getByTestId("CreatePost");
  // const ButtonElement = getByText("Share Link");
  // fireEvent.click(ButtonElement);
  expect(element).toBeInTheDocument();
});

it("Clicking Edit on a HomeFeedElement", () => {
  const changeEditedPost = jest.fn();
  const post = {
    id: 0,
    link: "https://9gag.com",
    description: "Some website",
    author: { id: 0, name: "Author" },
    post_tagged_users: [{ user: { name: "Tagged User" } }]
  };
  const { getByTestId, getByText } = render(
    <HomeFeedElement post={post} changeEditedPost={changeEditedPost} />
  );
  const element = getByTestId("HomeFeedItem");
  const ButtonElement = getByText("Edit Post");
  fireEvent.click(ButtonElement);
  expect(element).toBeInTheDocument();
  expect(ButtonElement).toBeInTheDocument();
  expect(changeEditedPost).toBeCalledWith(0);
});
