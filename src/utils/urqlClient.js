import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange
} from "urql";
import { GRAPHQL_ENDPOINT } from "../constants";
import { devtoolsExchange } from "@urql/devtools";

const client = createClient({
  url: GRAPHQL_ENDPOINT,
  fetchOptions: () => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
    return {
      headers: { authorization: accessToken ? `Bearer ${accessToken}` : "" }
    };
  },
  exchanges: [dedupExchange, devtoolsExchange, cacheExchange, fetchExchange]
});

export default client;
