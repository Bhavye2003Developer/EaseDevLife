import React from "react";
import { motion } from "framer-motion";
import Typewriter from "../Typewritter";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh text-white bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl text-center"
      >
        <Typewriter />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              Record Videos
            </h2>
            <p className="mb-4">
              Turn any website URL into a captivating video presentation.
            </p>
            <Link to={"/record"}>
              <button className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600">
                Get Started
              </button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              Generate PDFs
            </h2>
            <p className="mb-4">
              Convert URLs into polished PDF documents effortlessly.
            </p>
            <Link to={"/pdf"}>
              <button className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600">
                Get Started
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
