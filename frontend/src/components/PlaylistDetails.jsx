import React, { useState } from "react";
import SongSearch from "./SongSearch";
import { addSongToPlaylist } from "../api/api";

const PlaylistDetails = ({ playlist }) => {
  const [songs, setSongs] = useState(playlist.songs);

  const handleAddSong = async (song) => {
    await addSongToPlaylist(playlist._id, song._id);
    setSongs([...songs, song]);
  };

  return (
    <div>
      <h3>📂 {playlist.name}</h3>
      
      {/* Search and Add Songs */}
      <SongSearch onSongSelect={handleAddSong} />

      {/* Song List */}
      <ul>
        {songs.map((song) => (
          <li key={song._id}>{song.title} - {song.artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDetails;
