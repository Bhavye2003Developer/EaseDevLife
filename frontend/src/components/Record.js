import { useState } from "react";
import Video from "./Video";

const Record = () => {
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleAddURL = () => {
    if (url) {
      setUrls([...urls, url]);
    }
    setUrl("");
  };

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
        body: JSON.stringify({ urls }),
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
    <div className="flex items-start h-dvh pt-20 bg-gray-900">
      <div className="flex flex-col mr-10 pl-48">
        <div className="w-96 h-52 bg-gray-400 my-5 p-2 overflow-y-auto overflow-x-auto scrollbar">
          <div className="flex flex-wrap flex-col">
            {urls.map((url, index) => (
              <span key={index}>{url}</span>
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <input
            type="text"
            value={url}
            placeholder="Enter path"
            onChange={(e) => setUrl(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleAddURL();
            }}
            className="w-60 px-4 py-2 mr-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white"
          />
          <button
            onClick={() => {
              handleAddURL();
            }}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
          >
            ADD URL
          </button>
        </div>
        <button
          onClick={() => {
            if (urls.length > 0) sendUrlInfo();
          }}
          className="mt-4 px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:bg-green-600"
        >
          MAKE A VIDEO
        </button>
      </div>

      <div className="flex justify-center items-center">
        {videoUrl ? (
          <Video url={videoUrl} />
        ) : (
          <p className="mt-8 text-white">No video</p>
        )}
      </div>
    </div>
  );
};

export default Record;
