const express = require("express");
const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

const app = express();

app.use(express.json());

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

app.get("/record", async (req, res) => {
  const Config = {
    followNewTab: true,
    fps: 30,
    videoFrame: {
      width: 1024,
      height: 768,
    },
    videoCrf: 18,
    videoCodec: "libx264",
    videoPreset: "slow",
    videoBitrate: 1000,
    autopad: {
      color: "black" | "#35A5FF",
    },
    aspectRatio: "16:9",
  };

  return await puppeteer
    .launch({
      headless: false,
    })
    .then(async (browser) => {
      const page = await browser.newPage();
      const recorder = new PuppeteerScreenRecorder(page, Config);
      await recorder.start("./simple.mp4"); // supports extension - mp4, avi, webm and mov

      const urls = [
        "https://www.browserless.io/",
        "https://docs.browserless.io/",
        "https://docs.browserless.io/migrate",
        "https://docs.browserless.io/Hosted-Service/how-it-works",
      ];

      for (const url of urls) {
        await page.goto(url);
        await autoScroll(page);
      }

      await recorder.stop();
      await browser.close();

      res.send("completed");
    })
    .catch((err) => {
      console.log(err);
    });

  // Create a new page
});

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

app.listen(8080, () => console.log("Listening on PORT: 8080"));
