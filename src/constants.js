export const OAUTH_DOMAIN = "linkshare.au.auth0.com";
export const OAUTH_CLIENT_ID = "OiQpOQkpE8y3xVsPhDi4TGPhiHd01cxO";
export const OAUTH_AUDIENCE = "hasura";
export const OAUTH_REDIRECT_URL = `${process.env.REACT_APP_BASE_PATH}/callback`;
export const GRAPHQL_ENDPOINT =
  "https://link-share-graphql.herokuapp.com/v1/graphql";
export const GRAPHQL_SUBSCRIPTION_ENDPOINT =
  "wss://link-share-graphql.herokuapp.com/v1/graphql";
export const isLinkRegex = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
);
export const NOTIFICATION_STATUSES = {
  TAGGED_POST: "TAGGED_POST",
  REQUEST_RECEIVED: "REQUEST_RECEIVED"
};
