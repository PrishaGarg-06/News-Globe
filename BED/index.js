require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const newsRoutes = require("./routes/news");
const topReadsRoutes = require("./routes/topreads");
const authRoutes = require("./routes/auth");
const bookmarksRouter = require('./routes/bookmarks');
const likeRouter = require('./routes/like');

if (!process.env.NEWS_API_KEY) {
  console.error("Error: NEWS_API_KEY is not defined in the environment variables.");
  process.exit(1); 
}
if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET is not defined in the environment variables.");
  process.exit(1); 
}
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in the environment variables.");
  process.exit(1); 
}

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware using Express as application
app.use(express.json());
app.use(cors());

console.log("Mongo URL: ", process.env.MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  });

app.use("/api/news", newsRoutes); 
app.use("/api/topreads", topReadsRoutes); 
app.use("/api/auth", authRoutes); 
app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/like', likeRouter);


app.get("/", (req, res) => {
  res.send("Backend server is running!");
});
 
// Error handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



