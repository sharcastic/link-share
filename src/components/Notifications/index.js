import React, { useContext, useState } from "react";
import { useMutation } from "urql";
import { useAuth0 } from "../../utils/Auth0";
import { addConnectionMutation, readNotificationMutation } from "../../queries";
import ProfileDetailsContext from "../../context/ProfileDetailsContext/ProfileDetailsContext";
import NotificationItem from "./NotificationItem";

const Notifications = ({ notifications }) => {
  const { user = {} } = useAuth0();
  const { updateConnectionsAndRequests } = useContext(ProfileDetailsContext);
  const [, addConnection] = useMutation(addConnectionMutation);
  const [, markNotificationAsRead] = useMutation(readNotificationMutation);
  const [markedNotifications, setMarkedNotifications] = useState([]);
  const onAcceptRequestClick = selectedNotification => {
    addConnection({
      requestedUserID: selectedNotification.notification_created_by.id,
      userID: user.sub,
      connectionObject: [
        {
          user_id: selectedNotification.notification_created_by.id,
          connected_user_id: user.sub
        },
        {
          user_id: user.sub,
          connected_user_id: selectedNotification.notification_created_by.id
        }
      ]
    }).then(res => {
      if (!res.error) {
        updateConnectionsAndRequests();
      }
    });
  };
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
