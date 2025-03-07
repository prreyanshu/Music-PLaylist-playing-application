import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [suggestedSongs, setSuggestedSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Playlists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // ✅ Redirect if no token
    }
  }, [navigate]);
  
  // Fetch Suggested Songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await api.get("/songs");
        setSuggestedSongs(response.data);
      } catch (error) {
        console.error("Error fetching suggested songs:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Create Playlist Section */}
      <motion.div
        className="flex justify-center"
        whileHover={{ scale: 1.05 }}
      >
        <button
          className="bg-purple-600 px-6 py-3 rounded-md text-white font-semibold shadow-lg hover:bg-purple-700 transition"
          onClick={() => navigate("/playlists")}
        >
          ➕ Create Playlist
        </button>
      </motion.div>

      {/* User Playlists */}
      <h2 className="text-2xl font-bold mt-8 mb-4">🎵 Your Playlists</h2>
      {loading ? (
        <p className="text-gray-400">Loading playlists...</p>
      ) : playlists.length === 0 ? (
        <p className="text-gray-500">You have no playlists yet. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <motion.div
              key={playlist._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold">{playlist.name}</h3>
              <p className="text-sm text-gray-400">{playlist.songs.length} songs</p>
              <button className="mt-3 bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600">
                View Playlist
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Suggested Songs */}
      <h2 className="text-2xl font-bold mt-8 mb-4">🔥 Suggested Songs</h2>
      {loading ? (
        <p className="text-gray-400">Loading suggested songs...</p>
      ) : suggestedSongs.length === 0 ? (
        <p className="text-gray-500">No song suggestions available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedSongs.map((song) => (
            <motion.div
              key={song._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-semibold">{song.title}</h3>
              <p className="text-sm text-gray-400">{song.artist}</p>
              <button className="mt-3 bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600">
                Play
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
