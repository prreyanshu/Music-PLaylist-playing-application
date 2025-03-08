const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const mongoose = require("mongoose");

// ✅ Get all playlists for a user
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user }).populate("songs");
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: "Error fetching playlists", details: error.message });
  }
};

// ✅ Create a new playlist
exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const newPlaylist = new Playlist({ name, user: req.user, songs: [] });
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
    //console.log("User in request:", req.user);
  } catch (error) {
    res.status(500).json({ error: "Error creating playlist", details: error.message });
  }
};

// ✅ Add a song to a playlist
exports.addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    if (!playlistId || !songId) {
      return res.status(400).json({ error: "Playlist ID and Song ID are required" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(playlistId) || !mongoose.Types.ObjectId.isValid(songId)) {
      return res.status(400).json({ error: "Invalid playlist or song ID" });
    }
    
    res.json({ message: "Song added to playlist", playlist });
  } catch (error) {
    res.status(500).json({ error: "Error adding song", details: error.message });
  }
};

// ✅ Delete a playlist
exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Playlist deleted" });
    
  } catch (error) {
    res.status(500).json({ error: "Error deleting playlist", details: error.message });
  }
};
