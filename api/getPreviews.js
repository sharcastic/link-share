import { getMetadata } from "page-metadata-parser";
import domino from "domino";
import fetch from "node-fetch";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false
});

const cache = {};

module.exports = async (req, res) => {
  const arrayOfURLs = req.body;
  const cachedURLs = [];
  const validURLs = [];
  arrayOfURLs.forEach(url => {
    if (cache[url]) {
      cachedURLs.push(url);
    } else {
      validURLs.push(url);
    }
  });
  const arrOfPromises = validURLs.map(url => fetch(url, { agent }));
  const responses = await Promise.allSettled(arrOfPromises);
  const successfulRequests = [];
  const rejectedRequests = [];
  responses.forEach(async (response, index) => {
    if (response.status === "fulfilled") {
      successfulRequests.push({
        url: validURLs[index],
        response: response.value
      });
    } else {
      rejectedRequests.push({
        url: validURLs[index],
        error: "Preview cannot be generated"
      });
    }
  });
  console.log(successfulRequests);
  if (successfulRequests.length > 0) {
    const htmlArr = await Promise.all(
      successfulRequests.map(i => i.response.text())
    );
    const metadataArr = htmlArr.map((html, index) => {
      const doc = domino.createWindow(html).document;
      const { url } = successfulRequests[index];
      const metadata = getMetadata(doc, url);
      cache[url] = metadata;
      return { metadata, url };
    });
    res.end(
      JSON.stringify([
        ...metadataArr,
        ...cachedURLs.map(url => ({ url, metadata: cache[url] })),
        ...rejectedRequests
      ])
    );
  } else {
    res.end(
      JSON.stringify([
        ...cachedURLs.map(url => ({ url, metadata: cache[url] })),
        ...rejectedRequests
      ])
    );
  }
};
