const { chromium } = require('playwright');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Route for handling perfume search
app.post('/search', async (req, res) => {
    const searchTerm = req.body.searchTerm;

    try {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Navigate to Sephora's search results page
        await page.goto(`https://www.sephora.com/search/search.jsp?keyword=${encodeURIComponent(searchTerm)}`);

        // Wait for the search results to load
        await page.waitForSelector('.css-12egk0t');

        // Extract perfume data
        const perfumes = await page.evaluate(() => {
            const perfumeElements = document.querySelectorAll('.css-12egk0t');
            const perfumeList = [];

            perfumeElements.forEach(element => {
                const name = element.querySelector('.css-ktoumz').textContent.trim();
                const brand = element.querySelector('.css-ktoumz + span').textContent.trim();
                const price = element.querySelector('.css-0').textContent.trim();

                perfumeList.push({ name, brand, price });
            });

            return perfumeList;
        });

        await browser.close();

        res.json(perfumes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
