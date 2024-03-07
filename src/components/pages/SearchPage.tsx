import React, { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import "./Searchpage.css";

export const SearchPage = () => {
  const [programData, setProgramData] = useState(null); // Initialize with null
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(
          "http://api.sr.se/api/v2/programs?size=1500&format=json"
        );
        const fetchedProgramData = await response.json();
        setProgramData(fetchedProgramData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchPrograms();
  }, []);

  const toggleFavorite = (programId) => {
    const isFavorite = favorites.some((fav) => fav.id === programId);
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== programId);
      setFavorites(updatedFavorites);
      console.log(updatedFavorites)
    } else {
      const programToAdd = programData.programs.find(
        (prg) => prg.id === programId
      );
      if (programToAdd) {
        setFavorites([...favorites, programToAdd]);
        console.log(programToAdd)
      }
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const filtered = programData.programs.filter((prg) =>
        prg.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };
  if (!programData) {
    return (
      <>
        <Navbar />
        <div className="search-page-container">
          <p>Loading program data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="search-page-container">
        <div className="searchbar-container">
          <label htmlFor="search">Search for a program!</label>
          <input
            type="search"
            placeholder="Search..."
            id="search"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <button onClick={handleSearch}>Search</button>

        {filteredResults.length > 0 && (
          <div className="search-results">
            {filteredResults.map((prg) => (
              <ul key={prg.id}>
                <img src={prg.programimage} alt="" />
                <div className="text-container">
                  <li>{prg.name}</li>
                  <li>{prg.channel.name}</li>
                  <li>{prg.description}</li>
                  <li>{prg.schedule}</li>
                </div>
                <button onClick={() => toggleFavorite(prg.id)}>
                  {favorites.some((fav) => fav.id === prg.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </ul>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
