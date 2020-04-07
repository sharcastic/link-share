import { getMetadata } from "page-metadata-parser";
import domino from "domino";
import fetch from "node-fetch";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false
});

const cache = {};

module.exports = async (req, res) => {
  console.log(cache);
  const { link } = req.query;
  const cachedResponse = cache[link];
  if (cachedResponse) {
    console.log("FROM CACHE");
    res.end(JSON.stringify(cachedResponse));
  } else {
    const response = await fetch(link, { agent });
    const html = await response.text();
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, link);
    cache[link] = metadata;
    res.end(JSON.stringify(metadata));
  }
};
