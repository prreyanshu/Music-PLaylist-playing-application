const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

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
  } catch (error) {
    res.status(500).json({ error: "Error creating playlist", details: error.message });
  }
};

// ✅ Add a song to a playlist
exports.addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ error: "Song not found" });

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json({ message: "Song added to playlist", playlist });
  } catch (error) {
    res.status(500).json({ error: "Error adding song", details: error.message });
  }
};

// ✅ Delete a playlist
exports.deletePlaylist = async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Playlist deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting playlist", details: error.message });
  }
};
