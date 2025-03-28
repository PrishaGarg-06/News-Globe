const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = process.env.NEWS_API_KEY;

if (!API_KEY) {
    console.error("API key is missing! Check your environment variables.");
    process.exit(1); 
}

router.get("/topreads", async (req, res) => {
    const { q = "all", page = 1 } = req.query;
    const pageSize = 21;

    const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles || [];
        const articlesWithImages = articles.filter(
            (item) => item.urlToImage && item.urlToImage.trim() !== ""
        );

        res.json({
            articles: articlesWithImages,
            totalResults: response.data.totalResults || 0,
        });
    } catch (error) {
        console.error("Error fetching top reads:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data?.message || "Failed to fetch top reads" });
    }
});

module.exports = router;





