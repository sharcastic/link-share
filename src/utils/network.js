const cache = {};

const SERVERLESSCONDITION =
  process.env.NODE_ENV === "production" || process.env.REACT_APP_DEV_SERVERLESS;

const fakeServerless = validURLs =>
  new Promise(resolve => {
    resolve({
      json: () =>
        new Promise(resol =>
          resol(
            validURLs.map(i => ({
              url: i,
              metadata: {
                title: "GENERIC TITLE",
                description: "GENERIC DESCRIPTION",
                image:
                  "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
              }
            }))
          )
        )
    });
  });

export const callServerless = async arrayOfURLs => {
  const validURLs = new Set();
  const invalidURLs = [];
  const cachedURLs = [];
  const responseObj = {};
  arrayOfURLs.forEach(url => {
    try {
      new URL(url);
      if (cache[url]) {
        cachedURLs.push(url);
      } else {
        validURLs.add(url);
      }
    } catch {
      invalidURLs.push(url);
    }
  });
  if (validURLs.size > 0) {
    const res = SERVERLESSCONDITION
      ? await fetch("/api/getPreviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(Array.from(validURLs))
        })
      : await fakeServerless(Array.from(validURLs));
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
  }
  invalidURLs.forEach(url => {
    responseObj[url] = {
      responseReceived: true,
      error: "Link is not a valid URL"
    };
  });
  cachedURLs.forEach(url => {
    responseObj[url] = {
      responseReceived: true,
      ...cache[url]
    };
  });
  return responseObj;
};
