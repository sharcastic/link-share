import {
  createClient,
  dedupExchange,
  fetchExchange,
  subscriptionExchange
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { devtoolsExchange } from "@urql/devtools";
import { GRAPHQL_ENDPOINT, GRAPHQL_SUBSCRIPTION_ENDPOINT } from "../constants";

const setTokenInHeader = () => {
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
  return {
    headers: { authorization: accessToken ? `Bearer ${accessToken}` : "" }
  };
};

const subscriptionClient = new SubscriptionClient(
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
  {
    reconnect: true,
    connectionParams: setTokenInHeader,
    lazy: true,
    reconnectionAttempts: 10
  }
);

const cache = cacheExchange({});

const client = createClient({
  url: GRAPHQL_ENDPOINT,
  fetchOptions: setTokenInHeader,
  exchanges: [
    dedupExchange,
    devtoolsExchange,
    cache,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      }
    })
  ]
});

export default client;
