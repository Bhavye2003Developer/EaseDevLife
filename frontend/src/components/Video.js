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
      </React.Fragment>
    </div>
  );
};

export default Video;
