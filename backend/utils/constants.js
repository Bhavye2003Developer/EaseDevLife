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
      }, 300);
    });
  });
}

module.exports = { Config, autoScroll };
