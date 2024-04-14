import React, { useEffect, useRef, useState } from "react";
import getSnapShotURLs from "../utils/snapshots";

const Body = () => {
  const [url, setUrl] = useState("");
  return (
    <div>
      <input
        type="text"
        value={url}
        placeholder="Enter site url"
        style={{
          width: 400,
        }}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => console.log(url)}>FETCH</button>
    </div>
  );
};

export default Body;
