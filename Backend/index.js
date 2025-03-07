const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Load environment variables
dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
connectDB();

// ✅ Load routes safely
const routes = [
  { path: "/songs", module: "./routes/songRoutes" },
  { path: "/playlists", module: "./routes/playlistRoutes" },
  { path: "/spotify", module: "./routes/spotifyRoutes" },
  { path: "/auth", module: "./routes/authRoutes" },
];

routes.forEach(({ path, module }) => {
  try {
    const route = require(module);
    app.use(path, route);
    console.log(`✅ Loaded Route: ${path}`);
  } catch (error) {
    console.error(`❌ Error loading route ${path}:`, error.message);
  }
});

// ✅ Show all registered routes
console.log("\n✅ Available Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`➡️  ${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
  }
});

// ✅ Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
