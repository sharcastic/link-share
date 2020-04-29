export const OAUTH_DOMAIN = "linkshare.au.auth0.com";
export const OAUTH_CLIENT_ID = "OiQpOQkpE8y3xVsPhDi4TGPhiHd01cxO";
export const OAUTH_AUDIENCE = "hasura";
export const OAUTH_REDIRECT_URL = `${process.env.REACT_APP_BASE_PATH}/callback`;
export const GRAPHQL_ENDPOINT =
  "https://link-share-graphql.herokuapp.com/v1/graphql";
export const GRAPHQL_SUBSCRIPTION_ENDPOINT =
  "wss://link-share-graphql.herokuapp.com/v1/graphql";
export const NOTIFICATION_STATUSES = {
  TAGGED_POST: "TAGGED_POST",
  REQUEST_RECEIVED: "REQUEST_RECEIVED"
};
