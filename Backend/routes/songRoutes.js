const express = require("express");
const { searchSongs, saveSong } = require("../controllers/songController");

const router = express.Router();

// ✅ Search for songs
router.post("/search", searchSongs);

// ✅ Save a song
router.post("/save", saveSong);
router.get("/songs", async (req, res) => {
    try {
      const songs = await Song.find();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

module.exports = router;
