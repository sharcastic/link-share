import React, { useContext, useState } from "react";
import { useMutation } from "urql";
import { readNotificationMutation } from "../../queries";
import ProfileDetailsContext from "../../context/ProfileDetailsContext/ProfileDetailsContext";
import NotificationItem from "./NotificationItem";

const Notifications = ({ notifications }) => {
  const { acceptRequest } = useContext(ProfileDetailsContext);
  const [, markNotificationAsRead] = useMutation(readNotificationMutation);
  const [markedNotifications, setMarkedNotifications] = useState([]);
  const onAcceptRequestClick = selectedNotification =>
    acceptRequest(selectedNotification.notification_created_by.id);
  const onMarkAsReadClick = selectedNotification => {
    setMarkedNotifications([...markedNotifications, selectedNotification.id]);
    markNotificationAsRead({
      notificationID: selectedNotification.id
    }).then(res => {
      if (!res.error) {
        setMarkedNotifications(
          markedNotifications.filter(j => j !== selectedNotification.id)
        );
      }
    });
  };
  return (
    <div>
      Notifications
      <ul>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            data={notification}
            markedNotifications={markedNotifications}
            onAcceptRequestClick={onAcceptRequestClick}
            onMarkAsReadClick={onMarkAsReadClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
