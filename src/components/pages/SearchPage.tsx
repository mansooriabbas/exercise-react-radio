import { Navbar } from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import "./Searchpage.css";

export const SearchPage = () => {
  const [programData, setProgramData] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("http://api.sr.se/api/v2/programs?size=1500&format=json");
        const fetchedProgramData = await response.json();
        setProgramData(fetchedProgramData);
        console.log(fetchedProgramData, "programData from search");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchPrograms();
  }, []);



  if (programData.length === 0) {
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
          />
        </div>

        <div className="search-results">
          {/* Render your search results here */}
        </div>
      </div>
    </>
  );
};
