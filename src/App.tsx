import { useEffect } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { useState } from "react";

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
    <div className="page-container">
      <Navbar />
      <h1>App component</h1>
    </div>
  );
};
