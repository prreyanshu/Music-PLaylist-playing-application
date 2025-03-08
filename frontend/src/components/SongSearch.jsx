import React, { useState } from "react";
import { searchSongs, saveSong } from "../api/api";

const SongSearch = ({ onSongSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await searchSongs(query);
    setResults(data.tracks.items);
  };

  const handleSaveSong = async (track) => {
    const songData = {
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      spotifyId: track.id,
    };
    
    const savedSong = await saveSong(songData);
    onSongSelect(savedSong.song);
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search song" />
      <button onClick={handleSearch}>Search</button>

      {/* Song Results */}
      <ul>
        {results.map((track) => (
          <li key={track.id}>
            {track.name} - {track.artists[0].name} 
            <button onClick={() => handleSaveSong(track)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongSearch;
