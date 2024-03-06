import { useContext, useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Channels } from "./components/pages/Channels";
import { LandingPage } from "./components/pages/LandingPage";
import { PageNotFound } from "./components/pages/PageNotFound";
import { Schedules } from "./components/pages/Schedules";
import { Categories } from "./components/pages/Categories";
import { SearchPage } from "./components/pages/SearchPage";

export const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scheduleData, setScheduleData] = useState([]);
  const [channelId, setChannelId] = useState(null);
  const [categorieData, setCategorieData] = useState([]);

  //Fetches

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          `http://api.sr.se/v2/channels?format=json&size=10&page=${currentPage}`
        );
        const jsonData = await response.json();
        setData(jsonData);

        // console.log(jsonData, "Channels");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchChannels();
  }, [currentPage]);

  const fetchSchedule = async (channelId) => {
    try {
      const response = await fetch(
        `http://api.sr.se/v2/scheduledepisodes?format=json&channelid=${channelId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching schedule:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://api.sr.se/api/v2/programcategories?format=json"
        );
        const categorieData = await response.json();
        setCategorieData(categorieData);
        // console.log("Fetched categories", ":", categorieData);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  //Fetches

  //Functions

  const handleLoadMore = () => {
    {
      currentPage < 6 && setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handleLoadLess = () => {
    currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1);
  };

  //Functions
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
        <Route
          path="schedules"
          element={<Schedules data={data} fetchSchedule={fetchSchedule} />}
        />
        <Route
          path="categories"
          element={<Categories categorieData={categorieData} />}
        />
        <Route path="searchpage" element={<SearchPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
