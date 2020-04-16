import React from "react";
import Button from "@atlaskit/button";
import { NOTIFICATION_STATUSES } from "../../constants";

const { TAGGED_POST, REQUEST_RECEIVED } = NOTIFICATION_STATUSES;

const NotificationItem = ({
  data,
  markedNotifications,
  onAcceptRequestClick,
  onMarkAsReadClick
}) => {
  const onAcceptRequest = () => onAcceptRequestClick(data);
  const markAsRead = () => onMarkAsReadClick(data);
  const getNotificationText = notification => {
    switch (notification.type) {
      case TAGGED_POST: {
        return `${notification.notification_created_by.name} tagged you in a post.`;
      }
      case REQUEST_RECEIVED: {
        return `${notification.notification_created_by.name} sent you a connection request.`;
      }
      default: {
        return "Unknown type of Notification";
      }
    }
  };
  return (
    <li>
      <span>{getNotificationText(data)}</span>
      {data.type === REQUEST_RECEIVED && (
        <Button onClick={onAcceptRequest}>Accept Request</Button>
      )}
      {data.status === "UNREAD" && (
        <Button
          isLoading={markedNotifications.find(j => j === data.id)}
          appearance="default"
          onClick={markAsRead}
        >
          Mark as Read
        </Button>
      )}
    </li>
  );
};

export default NotificationItem;
