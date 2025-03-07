import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Playlists = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState("");

  // Fetch Playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await api.get("/playlists", {
          headers: { "x-auth-token": token },
        });
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, [navigate]);

  // Create Playlist
  const createPlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/playlists",
        { name: newPlaylist },
        { headers: { "x-auth-token": token } }
      );
      setPlaylists([...playlists, response.data]);
      setNewPlaylist("");
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold text-center mb-6">📂 Manage Your Playlists</h2>

      {/* Create Playlist Input */}
      <div className="flex gap-4 justify-center mb-6">
        <input
          type="text"
          className="p-3 rounded-lg bg-gray-700 text-white outline-none"
          placeholder="Enter playlist name..."
          value={newPlaylist}
          onChange={(e) => setNewPlaylist(e.target.value)}
        />
        <button
          className="bg-blue-500 px-6 py-3 rounded-md text-white font-semibold hover:bg-blue-600 transition"
          onClick={createPlaylist}
        >
          ➕ Add
        </button>
      </div>

      {/* Display Playlists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <motion.div
            key={playlist._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold">{playlist.name}</h3>
            <p className="text-sm text-gray-400">{playlist.songs.length} songs</p>
            <button className="mt-3 bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600">
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
