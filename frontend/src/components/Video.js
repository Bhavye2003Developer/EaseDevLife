import React from "react";

const Video = ({ url }) => {
  return (
    <div
    // className="mt-10"
    >
      <React.Fragment>
        <video
          className="border border-gray-300 rounded-lg shadow-lg w-[600px] h-96 mt-5"
          controls
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button className="mt-4 px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:bg-green-600">
          <a href={url} download={new URL(url).hostname}>
            Download Video
          </a>
        </button>
      </React.Fragment>
    </div>
  );
};

export default Video;
