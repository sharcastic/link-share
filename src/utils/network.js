import { isLinkRegex } from "../constants";

const cache = {};

export const callServerless = async arrayOfURLs => {
  const validURLs = new Set();
  const invalidURLs = [];
  const cachedURLs = [];
  arrayOfURLs.forEach(url => {
    if (isLinkRegex.test(url)) {
      if (cache[url]) {
        cachedURLs.push(url);
      } else {
        validURLs.add(url);
      }
    } else {
      invalidURLs.push(url);
    }
  });
  const responseObj = {};

  if (validURLs.size > 0 || cachedURLs > 0) {
    const res = await fetch("/api/getPreviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Array.from(validURLs))
    });
    const responseArr = await res.json();
    console.log("responseArr", responseArr);
    responseArr.forEach(({ url, error, metadata }) => {
      if (error) {
        responseObj[url] = { responseReceived: true, error };
      } else {
        responseObj[url] = { responseReceived: true, ...metadata };
        cache[url] = responseObj[url];
      }
    });
    cachedURLs.forEach(url => {
      responseObj[url] = {
        responseReceived: true,
        ...cache[url]
      };
    });
    invalidURLs.forEach(url => {
      responseObj[url] = {
        responseReceived: true,
        error: "Link is not a valid URL"
      };
    });
  } else {
    invalidURLs.forEach(url => {
      responseObj[url] = {
        responseReceived: true,
        error: "Link is not a valid URL"
      };
    });
  }
  return responseObj;
};
