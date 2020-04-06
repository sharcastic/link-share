import { getMetadata } from "page-metadata-parser";
import domino from "domino";
import fetch from "node-fetch";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false
});

module.exports = async (req, res) => {
  const { link } = req.query;
  const response = await fetch(link, { agent });
  const html = await response.text();
  const doc = domino.createWindow(html).document;
  const metadata = getMetadata(doc, link);

  res.end(JSON.stringify(metadata));
};
