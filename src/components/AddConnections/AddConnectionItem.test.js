import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddConnectionItem from "./AddConnectionItem";

jest.mock("../../utils/Auth0", () => ({
  useAuth0: jest
    .fn()
    .mockReturnValueOnce({})
    .mockReturnValueOnce({ user: { sub: 0 } })
    .mockReturnValueOnce({ user: { sub: 0 } })
}));

const connection = { name: "Connection Name", id: 1 };

it("Test the Add friend button and test its onClick", async () => {
  const currentRequests = [];
  const sendingRequests = [];
  const addRequestClick = jest.fn();
  const { getByText } = render(
    <AddConnectionItem
      connection={connection}
      currentRequests={currentRequests}
      sendingRequests={sendingRequests}
      addRequestClick={addRequestClick}
    />
  );
  const element = getByText("Add Friend");
  fireEvent.click(element);
  expect(addRequestClick).toBeCalled();
});

it("Render the Accept Request button and test its onClick", async () => {
  const currentRequests = [{ sent_by_id: 1, sent_to_id: 0 }];
  const acceptRequestClick = jest.fn();
  const { getByText } = render(
    <AddConnectionItem
      connection={connection}
      currentRequests={currentRequests}
      sendingRequests={[]}
      acceptRequestClick={acceptRequestClick}
    />
  );
  const element = getByText("Accept Request");
  fireEvent.click(element);
  expect(acceptRequestClick).toBeCalled();
});

it("Show that Request is Pending", async () => {
  const currentRequests = [{ sent_by_id: 0, sent_to_id: 1 }];
  const { getByText } = render(
    <AddConnectionItem
      connection={connection}
      currentRequests={currentRequests}
      sendingRequests={[0, 1]}
    />
  );
  const element = await getByText("Request Pending!");

  expect(element).toBeInTheDocument();
});
