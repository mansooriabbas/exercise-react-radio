import "./Categories.css";
import { Navbar } from "../Navbar/Navbar";
import { useState, ReactElement } from "react";

interface Category {
  id: number;
  name: string;
  // Add any other properties as needed
}

interface Program {
  programcategory: {
    name: string;
  };
  channel: {
    name: string;
  };
  description: string;
  broadcastinfo: string;
  programimage: string;
  // Add any other properties as needed
}

interface CategoriesProps {
  categorieData: {
    programcategories: Category[];
  };
}

export const Categories: React.FC<CategoriesProps> = (props) => {
  const { programcategories } = props.categorieData;
  const [additionalData, setAdditionalData] = useState<Program[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryClick = async (categoryId: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.sr.se/api/v2/programs/index?programcategoryid=${categoryId}&format=json`
      );
      const additionalData = await response.json();
      setAdditionalData(additionalData.programs);
    } catch (error) {
      setError("Error fetching additional data");
      console.error("Error fetching additional data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cat-container">
        <ul>
          {programcategories &&
            programcategories.map((cat) => (
              <li key={cat.id} onClick={() => handleCategoryClick(cat.id)}>
                {cat.name}
              </li>
            ))}
        </ul>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {additionalData && (
        <div className="additional-data-container">
          <h2>{additionalData[0].programcategory.name}</h2>

          <ul>
            {additionalData.map((dataItem, index) => (
              <li key={index}>
                <img src={dataItem.programimage} alt="" />
                <div className="text-container">
                  <p>
                    <span>Channel</span>:{" "}
                    {dataItem.channel.name.includes("No channel")
                      ? "Channel info not available"
                      : dataItem.channel.name}
                  </p>
                  <p>
                    <span>Description</span>: {dataItem.description}
                  </p>
                  <p>
                    <span>Broadcast Information</span>: {dataItem.broadcastinfo}
                  </p>
                  <p>
                    <span>Category</span>: {dataItem.programcategory.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
