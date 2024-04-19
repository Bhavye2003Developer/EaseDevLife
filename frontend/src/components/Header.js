import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex justify-center items-center pt-10 bg-gray-900">
      <div className="shadow-md rounded-xl h-20 w-9/12 bg-gray-800 flex justify-between items-center px-6">
        <h1 className="text-white text-3xl font-bold logo">EaseDevLife</h1>
        <nav>
          <ul className="flex space-x-6 text-white">
            <li>
              <Link
                to={"/"}
                className={`transition duration-300 ease-in-out font-bold ${
                  location.pathname === "/" ? "text-blue-400" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/video"}
                className={`transition duration-300 ease-in-out font-bold ${
                  location.pathname === "/video" ? "text-blue-400" : ""
                }`}
              >
                Video
              </Link>
            </li>
            <li>
              <Link
                to={"/pdf"}
                className={`transition duration-300 ease-in-out font-bold ${
                  location.pathname === "/pdf" ? "text-blue-400" : ""
                }`}
              >
                PDF
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
