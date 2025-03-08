import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import "../styles/Dashboard.css"; // ✅ Import the updated CSS
import DashboardHeader from "../components/DashboardHeader"; // ✅ Import the new header

const Dashboard = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [suggestedSongs, setSuggestedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await api.get("/songs");
        setSuggestedSongs(response.data);
      } catch (error) {
        console.error("Error fetching suggested songs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardHeader /> 

      <motion.button
        className="create-playlist-btn"
        whileHover={{ scale: 1.1 }}
        onClick={() => navigate("/playlists")}
      >
         Create Playlist
      </motion.button>

      <h2 className="section-title">🎵 Your Playlists</h2>
      {loading ? (
        <p className="loading-text">Loading playlists...</p>
      ) : playlists.length === 0 ? (
        <p className="empty-state">You have no playlists yet. Create one!</p>
      ) : (
        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <motion.div
              key={playlist._id}
              className="playlist-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{playlist.name}</h3>
              <p>{playlist.songs.length} songs</p>
              <button className="view-btn">View Playlist</button>
            </motion.div>
          ))}
        </div>
      )}

      <h2 className="section-title">🔥 Suggested Songs</h2>
      {loading ? (
        <p className="loading-text">Loading suggested songs...</p>
      ) : suggestedSongs.length === 0 ? (
        <p className="empty-state">No song suggestions available.</p>
      ) : (
        <div className="songs-grid">
          {suggestedSongs.map((song) => (
            <motion.div
              key={song._id}
              className="song-card"
              whileHover={{ scale: 1.05 }}
            >
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <button className="play-btn">Play</button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
