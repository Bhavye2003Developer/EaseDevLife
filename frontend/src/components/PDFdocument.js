const PDFDocument = ({ path }) => {
  console.log(path);

  return (
    <div className="flex justify-center">
      <iframe
        src={path}
        title="PDF Viewer"
        className="w-[310px] h-[500px] overflow-hidden  border border-black rounded-3xl"
      ></iframe>
    </div>
  );
};

export default PDFDocument;
