import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Channels } from "./components/pages/Channels";
import { LandingPage } from "./components/pages/LandingPage";
import { PageNotFound } from "./components/pages/PageNotFound";

export const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          `http://api.sr.se/v2/channels?format=json&size=10&page=${currentPage}`
        );
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchChannels();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    console.log(currentPage);
  };
  const handleLoadLess = () => {
    currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1);
    console.log(currentPage);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="channels"
          element={
            <Channels
              data={data}
              handleLoadMore={handleLoadMore}
              handleLoadLess={handleLoadLess}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
