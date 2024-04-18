import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oops! Error Occurred
        </h1>
        <p className="text-gray-600 mb-4">
          We're sorry, but something went wrong. Please try again later.
        </p>
        <Link to={"/"}>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
