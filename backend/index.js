const _ = require("lodash");

// returns nearest snapshot INFO
const checkWebsiteAvailability = async (URL) => {
  const WAYBACK_AVAILABILITY_API = "http://archive.org/wayback/available?url=";
  const response = await fetch(`${WAYBACK_AVAILABILITY_API}${URL}`);
  const json = await response.json();
  return _.isEmpty(json.archived_snapshots)
    ? null
    : json.archived_snapshots.closest.url;
};

const getSnapShots = async (
  URL = "https://browserless.io",
  // to, from in YYYYMMDDHHMMSS
  FROM = 2023,
  TO = 2024
) => {
  const WAYBACK_USERSITE_URL = await checkWebsiteAvailability(URL);
  if (WAYBACK_USERSITE_URL) {
    const response = await fetch(
      `http://web.archive.org/cdx/search/cdx?url=${URL}&from=${FROM}&to=${TO}&filter=statuscode:200&filter=mimetype:text/html&output=json&limit=20`
    );
    const json = await response.json();
    return {
      data: json,
      status: 0,
    };
  }
  return {
    data: [],
    status: 1,
  }; // error occured
};

const getSnapShotURLs = async (URL) => {
  const snapshots = await getSnapShots(URL);

  const snapShotUrls = snapshots.data.slice(1).map((snapshot) => {
    const timestamp = snapshot[1];
    const url = `https://web.archive.org/web/${timestamp}/${URL}`;
    return { timestamp, url };
  });

  return snapShotUrls;
};
