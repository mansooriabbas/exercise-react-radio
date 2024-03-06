import { Navbar } from "../Navbar/Navbar";
import "./Searchpage.css";
export const SearchPage = () => {
  return (
    <>
        <Navbar />
      <div className="search-page-container">
        <div className="searchbar-container">
          <label htmlFor="search">Search for a program!</label>
          <input type="search" placeholder="Search..." id="search" />
        </div>
      </div>
    </>
  );
};
