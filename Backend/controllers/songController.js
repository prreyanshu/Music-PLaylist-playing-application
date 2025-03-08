const axios = require("axios");
const Song = require("../models/Song");
require("dotenv").config();

// ✅ Search for songs using Spotify API
exports.searchSongs = async (req, res) => {
  try {
    const { songName } = req.body;
    if (!songName) return res.status(400).json({ error: "Song name is required" });

    const encodedSongName = encodeURIComponent(songName);
    const url = `https://spotify23.p.rapidapi.com/search/?q=${encodedSongName}&type=multi&offset=0&limit=10&numberOfTopResults=5`;

    const response = await axios.get(url, {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching songs", details: error.message });
  }
};

// ✅ Save a song to MongoDB
exports.saveSong = async (req, res) => {
  try {
    const { title, artist, album, spotifyId } = req.body;

    const existingSong = await Song.findOne({ spotifyId });
    if (existingSong) return res.status(400).json({ error: "Song already exists" });

    const newSong = new Song({ title, artist, album, genre: "Unknown", duration: 0, spotifyId });
    await newSong.save();

    res.json({ message: "Song saved successfully", song: newSong });
  } catch (error) {
    res.status(500).json({ error: "Error saving song", details: error.message });
  }
};


const searchSongs = async (req, res) => {
    console.log("🔍 Received Search Request:", req.body);
    // Process request...
};
