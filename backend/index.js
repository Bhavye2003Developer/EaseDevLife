const express = require("express");
const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");
const { Config, autoScroll } = require("./utils/constants");
const cors = require("cors");
const path = require("path");
const { getPdf } = require("./utils/webPDF");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "/videos")));
app.use(cors());

app.post("/pdf", async (req, res) => {
  const { urls } = req.body;
  console.log(urls);

  try {
    const mergedPDFfilePath = await getPdf("../backend/public/pdfs/", urls);
    return res.sendFile(`pdfs/${mergedPDFfilePath}`, {
      root: path.join(__dirname, "public"),
    });

    // const pathy = "pdfs/final@github.com&&.pdf";
    // return res.sendFile(pathy, {
    //   root: path.join(__dirname, "public"),
    // });
  } catch (err) {
    console.log("server error: ");
    console.log(err);
    res.sendStatus(500);
  }

  return res.send("No url provided");
});

app.post("/record", async (req, res) => {
  console.log("requested");

  const video_path = "./public/videos/user1.mp4";

  const { url, urlPaths } = req.body;

  return await puppeteer
    .launch({
      headless: false,
    })
    .then(async (browser) => {
      const page = await browser.newPage();
      const recorder = new PuppeteerScreenRecorder(page, Config);
      await recorder.start(video_path);

      for (const urlPath of urlPaths) {
        await page.goto(url + urlPath);
        await autoScroll(page);
      }
      await recorder.stop();
      await browser.close();

      console.log("sending file");

      return res.sendFile("videos/user1.mp4", {
        root: path.join(__dirname, "public"),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send("not able to process video!!!");
    });
});

app.listen(8080, () => console.log("Listening on PORT: 8080"));
