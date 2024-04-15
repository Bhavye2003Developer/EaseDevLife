const express = require("express");
const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");
const { Config, autoScroll } = require("./utils/constants");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "/videos")));
app.use(cors());

app.get("/image", async (req, res) => {
  const url = req.query.url;
  if (url) {
    let browser = null;
    return await puppeteer
      .launch({
        headless: false,
      })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.goto(url);
        const screenshot = await page
          .screenshot
          // { fullPage: true }
          ();
        res.end(screenshot, "binary");
      })
      .catch((error) => {
        if (!res.headersSent) {
          res.status(400).send(error.message);
        }
      })
      .finally(() => browser && browser.close());
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
