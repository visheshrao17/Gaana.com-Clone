

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE = "https://academics.newtonschool.co/api/v1/musicx/song";
const HEADERS = {
  accept: "application/json",
  projectID: "f104bi07c490",
};

// Reusable Fetch Hook
const useFetchSongs = (endpoint) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${API_BASE}${endpoint}`, { headers: HEADERS });
        const data = await response.json();
        setSongs(data.data);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchSongs();
  }, [endpoint]);

  return songs;
};

// Song List Component
const SongList = ({ title, endpoint }) => {
  const songs = useFetchSongs(endpoint);
  const navigate = useNavigate();
  const scrollContainerRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-8 relative group">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-neutral-300 px-3">{title}</h2>
        <div className="hidden group-hover:flex items-center gap-2 px-3">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto relative"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        <div className="flex gap-6 px-3 pb-4">
          {songs.map((song) => (
            <div
              key={song._id}
              className="relative group/card flex-shrink-0 bg-neutral-900 p-4 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:bg-neutral-800 hover:shadow-xl"
              onClick={() => navigate(`/song/${song._id}`)}
            >
              <div className="relative">
                <img
                  src={song.thumbnail}
                  alt={`${song.title} thumbnail`}
                  className="h-[220px] w-[220px] object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity rounded-lg">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transform transition-transform hover:scale-105 flex items-center gap-2">
                    <span className="text-2xl">▶</span>
                    Play
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-lg font-semibold text-white truncate w-[220px]">
                  {song.title}
                </h3>
                <p className="text-sm text-gray-400 truncate w-[220px]">
                  {song.artist.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <>
    
    <div className="bg-gradient-to-b from-neutral-900 to-black text-white min-h-screen">
    <Header />
      <div className="container mx-auto">
        <SongList title="🔥 Trending Songs" endpoint="?featured=Trending%20songs" />
        <SongList title="🎶 Top 20 of This Week" endpoint="?featured=Top%2020%20of%20this%20week" />
        <SongList title="📀 Top 50 Hits" endpoint="?limit=50" />
        <SongList title="🎵 Evergreen Melodies" endpoint="?featured=Evergreen%20melodies" />
        <SongList title="😊 Happy Vibes" endpoint="?mood=happy" />
        <SongList title="💖 Romantic Songs" endpoint="?mood=romantic" />
        <SongList title="🚀 Exciting Beats" endpoint="?mood=excited" />
        <SongList title="😢 Sad Songs" endpoint="?mood=sad" />
      </div>
    </div>
    </>
  );
};

export default HomePage;
