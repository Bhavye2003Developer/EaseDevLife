import React, { useState } from "react";
import PDFdocument from "./PDFdocument";
import ShimmerPDF from "./ShimmerPDF";

const PDFViewer = () => {
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [pdfURL, setPDFurl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddURL = () => {
    if (url.trim() !== "") {
      setUrls([...urls, url]);
      setUrl("");
      setErrorMessage("");
    } else {
      setErrorMessage("URL cannot be empty.");
    }
  };

  const handleRemoveURL = (indexToRemove) => {
    const updatedUrls = urls.filter((_, index) => index !== indexToRemove);
    setUrls(updatedUrls);
  };

  const sendURLs = async () => {
    if (urls.length === 0) {
      setErrorMessage("Please add at least one URL.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "video/mp4",
        },
        body: JSON.stringify({ urls: urls }),
      });

      const PDFdata = await response.arrayBuffer();

      const blob = new Blob([PDFdata], { type: "application/pdf" });
      const pdf_blob_url = URL.createObjectURL(blob);
      setPDFurl(pdf_blob_url);
      console.log("incoming: ", pdf_blob_url);
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Failed to generate PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center pt-10">
        <h1 className="text-3xl font-semibold mb-6 text-white">
          Webpage Demo Generator - PDF Tool
        </h1>
      </div>
      <div className="flex items-start pt-5 bg-gray-900 ml-20">
        <div className="flex flex-col mr-10 pl-48">
          <div className="w-96 h-52 bg-gray-800 my-5 p-2 overflow-y-auto overflow-x-auto scrollbar rounded-xl shadow-md">
            <div className="flex flex-col">
              {urls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center mb-1 text-white text-lg cursor-pointer transition duration-300 hover:text-red-500"
                  onClick={() => handleRemoveURL(index)}
                >
                  <span className="mr-2">{index + 1}. </span>
                  <span>{url}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-start">
            <input
              type="text"
              value={url}
              placeholder="Enter URL"
              onChange={(e) => setUrl(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleAddURL();
              }}
              className="w-60 px-4 py-2 mr-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white"
            />
            <button
              onClick={handleAddURL}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
            >
              ADD URL
            </button>
          </div>
          <button
            className="mt-4 px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:bg-green-600"
            onClick={() => sendURLs()}
          >
            GENERATE PDF
          </button>
          {errorMessage && (
            <div className="mt-2 text-red-500">{errorMessage}</div>
          )}
        </div>

        <div className="flex justify-center items-center">
          {isLoading ? (
            <ShimmerPDF />
          ) : (
            pdfURL && !errorMessage && <PDFdocument path={pdfURL} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
