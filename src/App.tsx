import { useContext, useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Channels } from "./components/pages/Channels";
import { LandingPage } from "./components/pages/LandingPage";
import { PageNotFound } from "./components/pages/PageNotFound";
import { Schedules } from "./components/pages/Schedules";

export const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scheduleData, setScheduleData] = useState([]);
  const [channelId, setChannelId] = useState(null);
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          `http://api.sr.se/v2/channels?format=json&size=10&page=${currentPage}`
        );
        const jsonData = await response.json();
        setData(jsonData);

        console.log(jsonData, "Channels");
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
      console.log("Fetched schedule for channel", channelId, ":", data); // Add this log statement
      return data;
    } catch (error) {
      console.error("Error fetching schedule:", error);
      return null;
    }
  };
  const handleLoadMore = () => {
    {
      currentPage < 6 && setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handleLoadLess = () => {
    currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1);
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
        <Route
          path="schedules"
          element={<Schedules data={data} fetchSchedule={fetchSchedule} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
