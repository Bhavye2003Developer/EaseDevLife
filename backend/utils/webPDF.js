const puppeteer = require("puppeteer");
const PDFDocument = require("pdf-lib").PDFDocument;
const { readFile } = require("fs/promises");
const fs = require("fs");

const mergePDF = async (pdf1Path, pdf2Path, mergePath) => {
  var pdfBuffer1 = await readFile(pdf1Path);
  var pdfBuffer2 = await readFile(pdf2Path);

  var pdfsToMerge = [pdfBuffer1, pdfBuffer2];

  const mergedPdf = await PDFDocument.create();
  for (const pdfBytes of pdfsToMerge) {
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const buf = await mergedPdf.save(); // Uint8Array

  let path = mergePath;
  fs.open(path, "w", function (err, fd) {
    fs.write(fd, buf, 0, buf.length, null, function (err) {
      fs.close(fd, function () {
        console.log("wrote the file successfully");
      });
    });
  });
};

// mergePDF(
//   "../public/pdfs/browserless.io-2.pdf",
//   "../public/pdfs/www.amazon.com-1.pdf",
//   "../public/pdfs/www.amazon.com-1.pdf"
// );

const wait = (msec) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, msec);
  });

const getPdf = async (dirPath, urls) => {
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: "ws://localhost:3000",
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });
    for (const urlPathIndex in urls) {
      const origin = new URL(urls[urlPathIndex]).hostname;
      await page.goto(urls[urlPathIndex], { waitUntil: "networkidle0" });

      await page.pdf({
        path: dirPath + `${origin}-${urlPathIndex}.pdf`,
        printBackground: true,
      });
    }

    browser.close();
    console.log("indivisual pdfs done...");

    const origin = new URL(urls[0]).hostname;
    const firstdirPath = dirPath + `${origin}-${0}.pdf`;

    for (const urlPathIndex in urls.slice(1)) {
      const origin = new URL(urls[+urlPathIndex + 1]).hostname;
      const path = dirPath + `${origin}-${+urlPathIndex + 1}.pdf`;
      await mergePDF(firstdirPath, path, firstdirPath);
      fs.unlinkSync(path);
    }

    console.log("waiting...");
    await wait(3000);
    console.log("waiting complete");

    let finalFileName = "final@";
    for (const url of urls) {
      const hostname = new URL(url).hostname;
      finalFileName += hostname + "&&";
    }
    finalFileName += ".pdf";

    fs.renameSync(firstdirPath, dirPath + finalFileName);
    console.log("intermediate: ", finalFileName);
    return finalFileName;
  } catch (err) {
    console.log("Error occured!");
    console.log(err);
    return null;
  }
};

// getPdf("public/pdfs/", [
//   "https://www.google.com",
//   "https://browserless.io/",
//   "https://react.dev/",
//   "https://stackoverflow.com/questions/70353134/load-pdf-document-with-pdf-lib-on-node-gives-no-pdf-header-found",
// ]);

module.exports = { getPdf };
