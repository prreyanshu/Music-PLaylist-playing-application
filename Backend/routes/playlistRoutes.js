const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getPlaylists, createPlaylist, addSongToPlaylist, deletePlaylist } = require("../controllers/playlistController");

const router = express.Router();

// ✅ Get all playlists
router.get("/", protect, getPlaylists);

// ✅ Create a new playlist
router.post("/", protect, createPlaylist);

// ✅ Add song to playlist
router.post("/addSong", protect, addSongToPlaylist);

// ✅ Delete a playlist
router.delete("/:id", protect, deletePlaylist);

module.exports = router;
