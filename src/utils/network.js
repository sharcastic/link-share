import { isLinkRegex } from "../constants";

export const callServerless = async url => {
  if (isLinkRegex.test(url)) {
    try {
      const res = await fetch(`/api/getPreview?link=${url}`);
      const json = await res.json();
      console.log("RESPONSE FROM FETCH", json);
      return { ...json, responseReceived: true };
    } catch {
      return { error: "Preview cannot be generated", responseReceived: true };
    }
  }
  return { responseReceived: true, error: "Link is not a valid URL" };
};
