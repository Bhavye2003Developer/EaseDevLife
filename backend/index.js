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
  console.log("processing...", urls);

  try {
    const mergedPDFfilePath = await getPdf("public/pdfs/", urls);
    if (mergedPDFfilePath) {
      console.log("final: ", mergedPDFfilePath);
      return res.sendFile(`pdfs/${mergedPDFfilePath}`, {
        root: path.join(__dirname, "public"),
      });
    }
  } catch (err) {
    console.log("server error: ");
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/record", async (req, res) => {
  console.log("requested");
  const video_path = "./public/videos/user1.mp4";
  const { urls } = req.body;
  return await puppeteer.launch({ headless: true }).then(async (browser) => {
    const page = await browser.newPage();
    const recorder = new PuppeteerScreenRecorder(page, Config);
    await recorder.start(video_path);

    try {
      for (const url of urls) {
        await page.goto(url);
        await autoScroll(page);
      }
      await recorder.stop();
      await browser.close();
      console.log("sending file");

      return res.sendFile("videos/user1.mp4", {
        root: path.join(__dirname, "public"),
      });
    } catch (err) {
      console.log("Error occurred!");
      await recorder.stop();
      await browser.close();
      return res.send("not able to process video!!!");
    }
  });
});

app.listen(8080, () => console.log("Listening on PORT: 8080"));
