import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Channels } from "./components/pages/Channels";
import { LandingPage } from "./components/pages/LandingPage";
import { PageNotFound } from "./components/pages/PageNotFound";
import { Schedules } from "./components/pages/Schedules";
import { Categories } from "./components/pages/Categories";
import { SearchPage } from "./components/pages/SearchPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import ContextProvider from "./ContextProvider";

interface Channel {
  id: number;
  name: string;
  description: string;
  // Add more properties as needed
}




export const App: React.FC = () => {
  const [data, setData] = useState<Channel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categorieData, setCategorieData] = useState<any[]>([]); 


  // Fetches

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          `http://api.sr.se/v2/channels?format=json&size=10&page=${currentPage}`
        );
        const jsonData: Channel[] = await response.json();
        setData(jsonData);

        // console.log(jsonData, "Channels");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchChannels();
  }, [currentPage]);

  const fetchSchedule = async (channelId: number) => {
    try {
      const response = await fetch(
        `http://api.sr.se/v2/scheduledepisodes?format=json&channelid=${channelId}`
      );
      const data: any[] = await response.json();
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
        const categorieData: any[] = await response.json();
        setCategorieData(categorieData);
        // console.log("Fetched categories", ":", categorieData);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetches

  // Functions

  const handleLoadMore = () => {
    currentPage < 6 && setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleLoadLess = () => {
    currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1);
  };

  //Functions
  return (
    <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="channels"
          element={
            <Channels
              data={data as any} 
              handleLoadMore={handleLoadMore}
              handleLoadLess={handleLoadLess}
            />
          }
        />
        <Route
          path="schedules"
          element={<Schedules data={data as any} fetchSchedule={fetchSchedule as any} />}
        />
        <Route
          path="categories"
          element={<Categories categorieData={categorieData as any} />}
        />
        <Route path="searchpage" element={<SearchPage />} />
        <Route path="favorites" element={<FavoritesPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
};
