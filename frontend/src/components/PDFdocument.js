const PDFDocument = ({ path }) => {
  console.log(path);

  return (
    <div className="flex justify-center mt-5">
      <iframe
        src={path}
        title="PDF Viewer"
        className="w-[310px] h-[500px] overflow-hidden  border rounded-3xl scrollbar  border-gray-300"
      ></iframe>
      <button className="mt-4 px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:bg-green-600 h-fit ml-5">
        <a href={path} download={new URL(path).hostname}>
          Download Video
        </a>
      </button>
    </div>
  );
};

export default PDFDocument;
