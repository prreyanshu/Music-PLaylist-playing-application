const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/search", async (req, res) => {
  const { songName } = req.body; // Get song name from request body

  if (!songName) {
    return res.status(400).json({ error: "Song name is required in the request body" });
  }

  const encodedSongName = encodeURIComponent(songName); // Encode for URL
  const url = `https://spotify23.p.rapidapi.com/search/?q=${encodedSongName}&type=multi&offset=0&limit=10&numberOfTopResults=5`;

  try {
    const response = await axios.get(url, {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY, // API key from .env
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
      },
    });

    res.json(response.data); // Send response back
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error: error.message });
  }
});

module.exports = router;
