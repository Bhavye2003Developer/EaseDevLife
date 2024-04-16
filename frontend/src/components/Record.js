import { useState } from "react";

const Record = () => {
  const [url, setUrl] = useState("");
  const [paths, setPaths] = useState([]);
  const [urlPath, setUrlPath] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

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
    console.log("incoming: ", video_blob_url);
  };

  return (
    <div className="flex flex-col justify-start h-screen items-start m-20">
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-80 px-4 py-2 mb-4 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
      />
      {paths.length !== 0 ? (
        <ul className="mb-4">
          {paths.map((path, index) => (
            <li key={index} className="mb-1">
              {path}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-gray-500">No paths provided</p>
      )}
      <div className="flex items-start">
        <input
          type="text"
          value={urlPath}
          placeholder="Enter path"
          onChange={(e) => setUrlPath(e.target.value)}
          className="w-60 px-4 py-2 mr-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={() => {
            if (urlPath) {
              setPaths([...paths, urlPath]);
            }
            setUrlPath("");
          }}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
        >
          ADD PATH
        </button>
      </div>
      <button
        onClick={() => {
          if (url) sendUrlInfo();
        }}
        className="mt-4 px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:bg-green-600"
      >
        MAKE A VIDEO
      </button>

      {videoUrl ? (
        <video
          width="750"
          height="400"
          controls
          className="mt-8 border border-black"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <p className="mt-8 text-gray-500">No video</p>
      )}
    </div>
  );
};

export default Record;
