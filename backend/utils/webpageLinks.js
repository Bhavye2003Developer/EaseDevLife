const playwright = require("playwright");
const fs = require("fs");

const getAllLinks = async (url) => {
  let browser = null;
  const domain_name = new URL(url).origin;
  console.log("processing...", domain_name);
  try {
    browser = await playwright["chromium"].launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(domain_name);
    await page.waitForTimeout(5000);
    const links = await page.evaluate(() => {
      const a_elements = document.querySelectorAll("a");
      const a_array = Array.from(a_elements);
      const paths = [];
      a_array.forEach((link) => {
        const origin = window.location.origin;
        const path = link.href.slice(origin.length).split("/")[1];
        if (
          path &&
          !paths.includes("/" + path) &&
          !path.split("").some((char) => "?=_".split("").includes(char))
        )
          paths.push("/" + path);
      });
      return paths;
    });
    await browser.close();
    console.log("processing done ", links.length, " links extracted");
    return links;
  } catch (err) {
    console.log("Not able to fetch all links");
    console.log(err);
  }
};

getAllLinks("https://facebook.com").then((links) => {
  fs.writeFileSync("links.txt", JSON.stringify(links));
  console.log("completed");
});
