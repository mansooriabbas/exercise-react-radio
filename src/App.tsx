import { useEffect } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Channels } from "./components/pages/Channels";
import { LandingPage } from "./components/pages/LandingPage";

export const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          "http://api.sr.se/api/v2/channels?format=json"
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
        <Route path="channels" element={<Channels />} />
        <Route path="landingPage" element={<LandingPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};
