const express = require("express");
const axios = require("axios");
const authenticate = require("./auth");

const router = express.Router();
const API_KEY = process.env.NEWS_API_KEY;

router.get("/protected-articles", authenticate, async (req, res) => {
  try {
    res.json({ articles: ["Article 1", "Article 2"] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles" });
  }
});

router.get("/protected-route", authenticate, (req, res) => {
  res.status(200).json({ message: "Access granted to protected route", user: req.user });
});

if (!API_KEY) {
  console.error("NEWS_API_KEY is not defined in the environment variables.");
  process.exit(1); 
}

router.get("/articles", async (req, res) => {
  const { q = "all", page = 1 } = req.query;
  const pageSize = 21;

  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${q}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;
    const apiResponse = await axios.get(apiUrl);
    
    res.json({
      articles: apiResponse.data.articles,
      totalResults: apiResponse.data.totalResults
    });
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    res.status(500).json({ error: "Error fetching articles" });
  }
});

module.exports = router;