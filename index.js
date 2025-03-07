// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
connectDB();

// ✅ Load routes
try {
  const songRoutes = require("./routes/songRoutes");
  const playlistRoutes = require("./routes/playlistRoutes");
  const spotifyRoutes = require("./routes/spotifyRoutes");
  const authRoutes = require("./routes/authRoutes"); // Add auth routes

  app.use("/songs", songRoutes);
  app.use("/playlists", playlistRoutes);
  app.use("/spotify", spotifyRoutes);
  app.use("/auth", authRoutes); // Register auth routes here

  console.log("✅ Routes Loaded Successfully");
} catch (error) {
  console.error("❌ Error loading routes:", error);
}

// ✅ Log all registered routes
console.log("✅ Available Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
