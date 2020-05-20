import { monthNames } from "../constants";

export const handleNotificationsSubscription = (
  notifications = [],
  response
) => [...response.notifications, ...notifications];

export const handleFeedPostsSubscription = (_, response) => {
  return response.links;
};

export const getTimeAndDate = dateString => {
  const date = new Date(dateString);
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const dd = date.getDate();
  const day = dd / 10 < 1 ? `0${dd}` : dd;
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return [`${hours}:${minutes}`, `${day} ${month} ${year}`];
};

export const selectComponentSerializer = ({ id, name, email }) => ({
  id,
  value: email,
  label: name
});
