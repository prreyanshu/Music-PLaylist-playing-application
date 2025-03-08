const express = require("express");
const { searchSongs, saveSong } = require("../controllers/songController");

const router = express.Router();

// ✅ Search for songs
router.post("/search", searchSongs);

// ✅ Save a song
router.post("/save", saveSong);

module.exports = router;
