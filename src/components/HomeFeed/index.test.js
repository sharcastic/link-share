import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HomeFeed from "./index";
jest.mock("../../utils/Auth0", () => ({
  useAuth0: jest.fn().mockReturnValue({ user: { sub: 0 } })
}));

it("Renders the HomeFeed with some posts", () => {
  const posts = [
    {
      id: 0,
      link: "https://9gag.com",
      description: "Some website",
      author: { id: 0, name: "Author" },
      post_tagged_users: [{ user: { name: "Tagged User" } }]
    }
  ];
  const { getByTestId } = render(<HomeFeed posts={posts} />);
  const element = getByTestId("HomeFeedItem");
  expect(element).toBeInTheDocument();
});

it("Renders the HomeFeed with some posts", () => {
  const { getByText } = render(<HomeFeed posts={[]} />);
  const element = getByText("No Posts to display!");
  expect(element).toBeInTheDocument();
});

it("Renders the HomeFeed when posts are not defined", () => {
  const { getByText } = render(<HomeFeed />);
  const element = getByText("Loading POSTS!");
  expect(element).toBeInTheDocument();
});

it("Renders the HomeFeed with some posts and then edits a post", () => {
  const posts = [
    {
      id: 0,
      link: "https://9gag.com",
      description: "Some website",
      author: { id: 0, name: "Author" },
      post_tagged_users: [{ user: { name: "Tagged User" } }]
    }
  ];
  const { getByTestId, getByText } = render(<HomeFeed posts={posts} />);
  const ButtonElement = getByText("Edit Post");
  fireEvent.click(ButtonElement);
  const element = getByTestId("CreatePost");
  expect(element).toBeInTheDocument();
});
