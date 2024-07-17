const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

// Function to scrape perfumes from Sephora
async function scrapePerfumes() {
    const url = 'https://www.sephora.com/shop/perfume';
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Wait for the perfume items to load
        await page.waitForSelector('.css-12egk0t');

        // Extract perfume data
        const perfumes = await page.evaluate(() => {
            const perfumeElements = document.querySelectorAll('.css-12egk0t');
            const perfumeList = [];

            perfumeElements.forEach(element => {
                const name = element.querySelector('.css-ktoumz').textContent.trim();
                const brand = element.querySelector('.css-ktoumz + span').textContent.trim();
                const price = element.querySelector('.css-0').textContent.trim();

                perfumeList.push({
                    Name: name,
                    Brand: brand,
                    Price: price,
                    Base_notes: base_notes
                });
            });

            return perfumeList;
        });

        return perfumes;
    } catch (error) {
        console.error('Error during scraping:', error);
        return [];
    } finally {
        await browser.close();
    }
}

// Example usage
(async () => {
    const perfumes = await scrapePerfumes();

    if (perfumes.length > 0) {
        // Print the results
        perfumes.forEach(perfume => {
            console.log(perfume);
        });

        // Optional: Save to a CSV file
        const fields = ['Name', 'Brand', 'Price', 'Base Notes'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(perfumes);
        const outputFile = path.join(__dirname, 'perfumes.csv');

        fs.writeFile(outputFile, csv, err => {
            if (err) {
                console.error('Error writing CSV file:', err);
            } else {
                console.log(`CSV file saved to ${outputFile}`);
            }
        });
    } else {
        console.log('No perfumes found');
    }
})();

