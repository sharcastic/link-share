export const handleNotificationsSubscription = (
  notifications = [],
  response
) => [...response.notifications, ...notifications];
