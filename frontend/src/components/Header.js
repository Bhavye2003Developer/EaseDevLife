import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-center items-center pt-10 bg-gray-900">
      <div className="shadow-md rounded-xl h-20 w-9/12 bg-gray-800 flex justify-center items-center">
        <ul className="flex space-x-4">
          <li>
            <Link
              to={"/"}
              className="text-white px-5 pb-5 transition duration-300 ease-in-out hover:shadow-lg hover:text-blue-400 hover:-translate-y-1"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/record"}
              className="text-white px-5 pb-5 transition duration-300 ease-in-out hover:shadow-lg hover:text-blue-400 hover:-translate-y-1"
            >
              Record
            </Link>
          </li>
          <li>
            <Link
              to={"/pdf"}
              className="text-white px-5 pb-5 transition duration-300 ease-in-out hover:shadow-lg hover:text-blue-400 hover:-translate-y-1"
            >
              PDF
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
