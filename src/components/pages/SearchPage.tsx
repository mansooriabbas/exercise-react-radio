import { Navbar } from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import "./Searchpage.css";

export const SearchPage = () => {
  const [programData, setProgramData] = useState([]);

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

  console.log(programData, "programData from search");

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
          <input type="search" placeholder="Search..." id="search" />
        </div>

        <div className="search-results">
          {programData.programs.map((prg) => (
            <ul>
              <li>{prg.name}</li>
              <li>{prg.channel.name}</li>
              <li>{prg.description}</li>
              <img src={prg.programimage} alt="" />
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};
