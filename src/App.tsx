import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Channels } from "./components/pages/Channels";
import { LandingPage } from "./components/pages/LandingPage";
import { PageNotFound } from "./components/pages/PageNotFound";

export const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          "http://api.sr.se/api/v2/channels?format=json&size=20"
        );
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchChannels();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="channels" element={<Channels data={data} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
