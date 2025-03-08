import React, { useState, useEffect } from "react";
import { getPlaylists, createPlaylist, deletePlaylist } from "../api/api";
import PlaylistDetails from "./PlaylistDetails";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    const data = await getPlaylists();
    setPlaylists(data);
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName) return;
    await createPlaylist(newPlaylistName);
    setNewPlaylistName("");
    loadPlaylists();
  };

  return (
    <div>
      <h2>🎵 Your Playlists</h2>
      
      {/* New Playlist Form */}
      <input 
        type="text" 
        value={newPlaylistName} 
        onChange={(e) => setNewPlaylistName(e.target.value)} 
        placeholder="Enter playlist name" 
      />
      <button onClick={handleCreatePlaylist}>Create Playlist</button>

      {/* Playlist List */}
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist._id}>
            <span onClick={() => setSelectedPlaylist(playlist)}>{playlist.name}</span>
            <button onClick={() => deletePlaylist(playlist._id)}>🗑️</button>
          </li>
        ))}
      </ul>

      {/* Show Playlist Details */}
      {selectedPlaylist && <PlaylistDetails playlist={selectedPlaylist} />}
    </div>
  );
};

export default PlaylistPage;
