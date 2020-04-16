import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NotificationItem from "./NotificationItem";
import { NOTIFICATION_STATUSES } from "../../constants";

const { TAGGED_POST, REQUEST_RECEIVED } = NOTIFICATION_STATUSES;

it("Renders a notification Item which has type REQUEST_RECEIVED and is read and accept the request", () => {
  const data = {
    type: REQUEST_RECEIVED,
    notification_created_by: {
      name: "Test Name"
    }
  };
  const onAcceptRequestClick = jest.fn();
  const { getByText } = render(
    <NotificationItem data={data} onAcceptRequestClick={onAcceptRequestClick} />
  );
  const TextElement = getByText(
    `${data.notification_created_by.name} sent you a connection request.`
  );
  const ButtonElement = getByText("Accept Request");
  fireEvent.click(ButtonElement);
  expect(TextElement).toBeInTheDocument();
  expect(onAcceptRequestClick).toBeCalled();
});

it("Renders a notification Item which has type TAGGED_POST and is unread and mark it as read", () => {
  const data = {
    type: TAGGED_POST,
    notification_created_by: {
      name: "Test Name"
    },
    status: "UNREAD"
  };
  const onMarkAsReadClick = jest.fn();
  const { getByText } = render(
    <NotificationItem
      data={data}
      markedNotifications={[]}
      onMarkAsReadClick={onMarkAsReadClick}
    />
  );
  const TextElement = getByText(
    `${data.notification_created_by.name} tagged you in a post.`
  );
  const ButtonElement = getByText("Mark as Read");
  fireEvent.click(ButtonElement);
  expect(TextElement).toBeInTheDocument();
  expect(ButtonElement).toBeInTheDocument();
  expect(onMarkAsReadClick).toBeCalled();
});

it("Renders an Unknown notification type message", () => {
  const data = {
    type: "UNKNOWN",
    notification_created_by: {
      name: "Test Name"
    }
  };
  const { getByText } = render(
    <NotificationItem data={data} markedNotifications={[]} />
  );
  const TextElement = getByText("Unknown type of Notification");
  expect(TextElement).toBeInTheDocument();
});
