const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Playlist = require("../models/Playlist");

const router = express.Router();

// ✅ Get All Playlists
router.get("/", protect, async (req, res) => {
  const playlists = await Playlist.find({ user: req.user });
  res.json(playlists);
});

// ✅ Create a Playlist
router.post("/", protect, async (req, res) => {
  const { name } = req.body;
  const newPlaylist = new Playlist({ name, user: req.user, songs: [] });
  await newPlaylist.save();
  res.status(201).json(newPlaylist);
});

// ✅ Delete a Playlist
router.delete("/:id", protect, async (req, res) => {
  await Playlist.findByIdAndDelete(req.params.id);
  res.json({ message: "Playlist deleted" });
});

module.exports = router;
