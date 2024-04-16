import { useEffect, useState } from "react";
import { Document, Page, pdfjs, Outline } from "react-pdf";

const PDFdocument = ({ path }) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

    console.log(pdfjs.GlobalWorkerOptions.workerSrc);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }

  return (
    <div>
      <h1>Showing pdf...</h1>
      {/* <div className="overflow-y-scroll">
        <Document
          file={path}
          onLoadSuccess={onDocumentLoadSuccess}
          onItemClick={onItemClick}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div> */}
      <center>
        <iframe src={path} frameborder="0" className="h-[500px] rounded-lg"></iframe>
      </center>
    </div>
  );
};

export default PDFdocument;
