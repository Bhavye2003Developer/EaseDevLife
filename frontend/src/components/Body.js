import { useRef, useState } from "react";
import React from "react";

const Body = () => {
  const [url, setUrl] = useState("");
  const [paths, setPaths] = useState([]);
  const [urlPath, setUrlPath] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const videoRef = useRef(null);

  const sendUrlInfo = async () => {
    const response = await fetch(
      // "https://thingproxy.freeboard.io/fetch/"+
      "http://localhost:8080/record",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "video/mp4",
        },
        body: JSON.stringify({ url, urlPaths: paths }),
      }
    );
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("video/mp4")) {
      console.error("Response is not a video file.");
      return;
    }

    const videoData = await response.arrayBuffer();
    const blob = new Blob([videoData], { type: "video/mp4" });
    const video_blob_url = URL.createObjectURL(blob);
    setVideoUrl(video_blob_url);
    console.log("incomming: ", video_blob_url);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="enter url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br />
      <br />
      {paths.length !== 0 ? (
        <ul>
          {paths.map((path) => {
            return (
              <li>
                {path}
                <br />
              </li>
            );
          })}
        </ul>
      ) : (
        <h3>No paths provided</h3>
      )}
      <input
        type="text"
        value={urlPath}
        placeholder="Enter path"
        onChange={(e) => setUrlPath(e.target.value)}
      />
      <button
        onClick={() => {
          if (urlPath) {
            setPaths([...paths, urlPath]);
          }
          setUrlPath("");
        }}
      >
        ADD PATH
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          console.log(url, paths);
          if (url) sendUrlInfo();
        }}
      >
        MAKE A VIDEO
      </button>
      <br />
      <br />
      <br />

      {videoUrl ? (
        <React.Fragment key={videoUrl}>
          <video width="750" height="500" controls>
            {console.log("in video: ", videoUrl)}
            <source src={videoUrl} type="video/mp4" />
          </video>
        </React.Fragment>
      ) : (
        "No video"
      )}
    </div>
  );
};

export default Body;
