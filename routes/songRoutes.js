const express = require("express");
const axios = require("axios");
const Song = require("../models/Song");
require("dotenv").config();

const router = express.Router();

// 🔹 Debug log to confirm file is loaded
console.log("✅ songRoutes.js is loaded");

// ✅ Save song from API to MongoDB
router.post("/save", async (req, res) => {
    console.log("🔹 POST /songs/save route hit");
    const { songName } = req.body;

    if (!songName) {
        return res.status(400).json({ error: "Song name is required" });
    }

    try {
        const encodedSongName = encodeURIComponent(songName);
        const url = `https://spotify23.p.rapidapi.com/search/?q=${encodedSongName}&type=multi&offset=0&limit=1&numberOfTopResults=1`;

        const response = await axios.get(url, {
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "x-rapidapi-host": "spotify23.p.rapidapi.com",
            },
        });

        const songData = response.data.tracks.items[0];

        if (!songData) {
            return res.status(404).json({ error: "No song found" });
        }

        const newSong = new Song({
            title: songData.data.name,
            artist: songData.data.artists.items.map((artist) => artist.profile.name).join(", "),
            album: songData.data.albumOfTrack.name,
            genre: "Unknown",
            duration: songData.data.duration.totalMilliseconds / 1000,
            spotifyId: songData.data.id,
        });

        await newSong.save();
        res.json({ message: "Song saved successfully", song: newSong });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error saving song", details: error.message });
    }
});

router.get("/", async (req, res) => {
  try {
    const songs = await Song.find(); // Fetch all songs from MongoDB
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching songs", details: error.message });
  }
});


module.exports = router;
