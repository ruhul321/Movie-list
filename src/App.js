import React, { useState, useEffect, useRef } from "react";
import MovieGrid from "./components/MovieGrid";
import "./styles/App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const searchBarRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-left">
          <img
            src="https://test.create.diagnal.com/images/Back.png"
            alt="Back"
            className="icon back-icon"
          />

          {/* Title (Always visible) */}
          <span className="header-title">Romantic Comedy</span>
        </div>

        <div className="header-right">
          {/* Search Bar */}
          {showSearchBar ? (
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-bar"
              ref={searchBarRef}
              autoFocus
            />
          ) : (
            <img
              src="https://test.create.diagnal.com/images/search.png"
              alt="Search"
              className="icon search-icon"
              onClick={toggleSearchBar}
            />
          )}
        </div>
      </header>

      <main>
        <MovieGrid searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default App;
