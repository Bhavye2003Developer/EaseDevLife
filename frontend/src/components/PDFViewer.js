import React, { useState } from "react";
import PDFdocument from "./PDFdocument";

const PDFViewer = () => {
  const [URLs, setURLs] = useState([]);
  const [url, setUrl] = useState("");
  const [pdfURL, setPDFurl] = useState("");

  const sendURLs = async () => {
    const response = await fetch("http://localhost:8080/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "video/mp4",
      },
      body: JSON.stringify({ urls: URLs }),
    });

    const PDFdata = await response.arrayBuffer();
    const blob = new Blob([PDFdata], { type: "application/pdf" });
    const pdf_blob_url = URL.createObjectURL(blob);
    setPDFurl(pdf_blob_url);
    console.log("incoming: ", pdf_blob_url);
  };

  return (
    <div className="">
      {URLs.length !== 0 ? (
        <ul className="mb-4">
          {URLs.map((path, index) => (
            <li key={index} className="mb-1">
              {path}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-gray-500">No URLs provided</p>
      )}
      <input
        type="text"
        value={url}
        placeholder="Enter path"
        onChange={(e) => setUrl(e.target.value)}
        className="w-60 px-4 py-2 mr-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
      />
      <br />
      <br />
      <button
        onClick={() => {
          if (url) {
            setURLs([...URLs, url]);
          }
          setUrl("");
        }}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
      >
        ADD URL
      </button>
      <br />
      <br />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
        onClick={() => {
          if (URLs.length > 0) sendURLs();
        }}
      >
        GENERATE PDF
      </button>

      {pdfURL ? <PDFdocument path={pdfURL} /> : null}
    </div>
  );
};

export default PDFViewer;
