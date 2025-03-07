const express = require("express");
const Playlist = require("../models/Playlist");

const router = express.Router();

router.post("/", async (req, res) => {
  const playlist = new Playlist(req.body);
  await playlist.save();
  res.json(playlist);
});

router.get("/", async (req, res) => {
  const playlists = await Playlist.find().populate("songs");
  res.json(playlists);
});

module.exports = router;
