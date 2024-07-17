// scraper.js
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Example: Extracting data
    const data = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.item'));
        return items.map(item => ({
            title: item.querySelector('.title').innerText,
            description: item.querySelector('.description').innerText,
            // Add more fields as needed
        }));
    });

    console.log(data);

    await browser.close();
})();
