const PDFDocument = ({ path }) => {
  console.log(path);

  return (
    <div className="flex justify-center mt-5">
      <iframe
        src={path}
        title="PDF Viewer"
        className="w-[310px] h-[500px] overflow-hidden  border rounded-3xl scrollbar  border-gray-300"
      ></iframe>
    </div>
  );
};

export default PDFDocument;
