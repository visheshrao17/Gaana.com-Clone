
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, TrendingUp, X, Loader2 } from "lucide-react";
import Logo from "../../Asset/Gaana1.png";
import debounce from 'lodash/debounce';

const API_BASE = "https://academics.newtonschool.co/api/v1/musicx";
const HEADERS = {
  accept: "application/json",
  projectID: "f104bi07c490",
};

function Header({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState({
    songs: [],
    artists: [],
  });
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const loadRecentSearches = () => {
      const saved = localStorage.getItem("recentSearches");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    };

    window.addEventListener("scroll", handleScroll);
    loadRecentSearches();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults({ songs: [], artists: [] });
        return;
      }

      setIsLoading(true);
      try {
        const [songsResponse, artistsResponse] = await Promise.all([
          fetch(`${API_BASE}/song?search={"title":"${query}"}`, { headers: HEADERS }),
          fetch(`${API_BASE}/artist?search={"name":"${query}"}`, { headers: HEADERS })
        ]);

        const [songsData, artistsData] = await Promise.all([
          songsResponse.json(),
          artistsResponse.json()
        ]);

        setSearchResults({
          songs: songsData.data || [],
          artists: artistsData.data || [],
        });
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(true);
    debouncedSearch(query);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const updated = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowDropdown(false);
    }
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults({ songs: [], artists: [] });
    setShowDropdown(false);
  };

  const removeFromRecent = (searchTerm, e) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s !== searchTerm);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <nav
      className={`top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? "bg-black/95 backdrop-blur-sm" : "bg-gradient-to-b from-black/80 to-transparent"}
        px-6 py-4`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Brand Logo"
            className="h-10 hover:opacity-80 transition-opacity cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center gap-6">
          {/* Search Section */}
          <div className="relative">
            <form
              onSubmit={handleSearch}
              className={`flex items-center gap-2 bg-neutral-800/50 rounded-full px-4 py-2 
                transition-all duration-300 
                ${isSearchFocused ? "bg-neutral-800 ring-2 ring-white/20" : "hover:bg-neutral-800"}`}
            >
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  setIsSearchFocused(true);
                  setShowDropdown(true);
                }}
                onBlur={() => {
                  setIsSearchFocused(false);
                  setTimeout(() => setShowDropdown(false), 200);
                }}
                placeholder="Search songs, artists..."
                className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-64"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-1 hover:bg-neutral-700 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </form>

            {/* Search Dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-800 rounded-lg shadow-xl border border-neutral-700 max-h-[70vh] overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                ) : (
                  <div className="p-2">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && !searchQuery && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 p-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Recent Searches</span>
                        </div>
                        {recentSearches.map((term) => (
                          <div
                            key={term}
                            className="flex items-center justify-between px-4 py-2 hover:bg-neutral-700 rounded-lg cursor-pointer group"
                            onClick={() => {
                              setSearchQuery(term);
                              debouncedSearch(term);
                            }}
                          >
                            <span className="text-gray-300">{term}</span>
                            <button
                              onClick={(e) => removeFromRecent(term, e)}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-600 rounded-full"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Search Results */}
                    {searchQuery && (
                      <>
                        {/* Songs */}
                        {searchResults.songs.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 p-2 text-gray-400">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-sm font-medium">Songs</span>
                            </div>
                            {searchResults.songs.slice(0, 5).map((song) => (
                              <div
                                key={song._id}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-700 rounded-lg cursor-pointer"
                                onClick={() => navigate(`/song/${song._id}`)}
                              >
                                <img
                                  src={song.thumbnail}
                                  alt={song.title}
                                  className="w-10 h-10 rounded object-cover"
                                />
                                <div>
                                  <div className="text-white text-sm">{song.title}</div>
                                  <div className="text-gray-400 text-xs">
                                    {song.artist.map((a) => a.name).join(", ")}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Artists */}
                        {searchResults.artists.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 p-2 text-gray-400">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-sm font-medium">Artists</span>
                            </div>
                            {searchResults.artists.slice(0, 3).map((artist) => (
                              <div
                                key={artist._id}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-700 rounded-lg cursor-pointer"
                                onClick={() => navigate(`/artist/${artist._id}`)}
                              >
                                <img
                                  src={artist.image}
                                  alt={artist.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="text-white text-sm">{artist.name}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {searchResults.songs.length === 0 && searchResults.artists.length === 0 && (
                          <div className="p-4 text-center text-gray-400">
                            No results found for "{searchQuery}"
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Section */}
          {isLogin ? (
            <div
              onClick={handleSignIn}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="text-white font-semibold">U</span>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="bg-red-900 hover:bg-red-500 text-white px-6 py-2 rounded-xl transition-all text-base font-medium"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;