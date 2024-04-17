import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-center pt-5 bg-gray-900">
      <div className="shadow-md rounded-xl px-2 h-20 py-5 w-9/12 bg-gray-800">
        <div className="flex justify-center">
          <ul className="flex space-x-4">
            <li>
              <Link
                to={"/"}
                className="text-white px-5 pb-5 transition duration-300 ease-in-out hover:shadow-xl"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/record"}
                className="text-white px-5 pb-5 transition duration-300 ease-in-out hover:shadow-xl"
              >
                Record
              </Link>
            </li>
            <li>
              <Link
                to={"/pdf"}
                className="text-white px-5 pb-5 transition duration-300 ease-in-out hover:shadow-xl"
              >
                PDF
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
