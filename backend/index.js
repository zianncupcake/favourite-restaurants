const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const port = 3001;

app.use(cors());

app.get("/scrape", async (req, res) => {
  const username = req.query.username;
    if (!username) {
      return res.status(400).sendStatus("Username is required");
    }

  try {
    const browser = await puppeteer.launch({
      args: ['--incognito',],
      headless: false,
    });
    const page = await browser.newPage();

    await page.goto("https://www.instagram.com/accounts/login", {
      waitUntil: "networkidle2",
    });
    //replace USERNAME with your Instagram account username
    await page.type("input[name=username]", "USERNAME", {
      delay: 20,
    });
    //replace PASSWORD with your Instagram account password
    await page.type("input[name=password]", "PASSWORD", { delay: 20 });
    await page.click("button[type=submit]", { delay: 20 });

    const notifyBtns = await page.waitForSelector("div.x1i10hfl.x1i10hfl");
    if (notifyBtns.length > 0) {
      await notifyBtns[0].click();
    } else {
      console.log("No notification buttons to click.");
    }
    await page.goto(`https://www.instagram.com/${username}/`, {
      waitUntil: "networkidle2",
    });

    let nameText = "";
    try {
      const nameElement = await page.waitForSelector("span.x1lliihq.x1plvlek", {
        timeout: 5000,
      });
      nameText = await nameElement?.evaluate((el) => el.textContent);
    } catch (error) {
      console.log("Name element not found within the specified timeout");
    }

    let descriptionText = "";
    try {
      const descriptionElement = await page.waitForSelector(
        "span._ap3a._aaco",
        { timeout: 5000 }
      );
      descriptionText = await descriptionElement?.evaluate(
        (el) => el.textContent
      );
    } catch (error) {
      console.log("Description element not found within the specified timeout");
    }

    let locationText = "";
    try {
      const locationElement = await page.waitForSelector("h1._ap3a._aaco", {
        timeout: 5000,
      });
      locationText = await locationElement?.evaluate((el) => el.textContent);
    } catch (error) {
      console.log("Location element not found within the specified timeout");
    }

    let websiteText = "";
    try {
      const websiteElement = await page.waitForSelector(
        "div.x6ikm8r.x10wlt62 > a > span.x1lliihq.x1plvlek > span.x6ikm8r",
        { timeout: 5000 }
      );
      websiteText = await websiteElement?.evaluate((el) => el.textContent);
    } catch (error) {
      console.log("Website element not found within the specified timeout");
    }
    await browser.close()
    res.json({
      nameText: nameText,
      descriptionText: descriptionText,
      locationText: locationText,
      websiteText: websiteText,
    });
  } catch (err) {
    console.error(err);
    res.status(500).sendStatus(err);
  }

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
