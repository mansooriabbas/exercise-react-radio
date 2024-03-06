import "./Categories.css";
import { Navbar } from "../Navbar/Navbar";
import { useState } from "react";
export const Categories = (props) => {
  const { programcategories } = props.categorieData;
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await fetch(
        `https://api.sr.se/api/v2/programs/index?programcategoryid=${categoryId}&format=json`
      );
      const additionalData = await response.json();
      setAdditionalData(additionalData);

      // console.log(
      //   "Additional data for category ID",
      //   categoryId,
      //   ":",
      //   additionalData
      // );
    } catch (error) {
      console.error("Error fetching additional data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cat-container">
        <ul>
          {programcategories &&
            programcategories.map((cat, index) => (
              <li key={index} onClick={() => handleCategoryClick(cat.id)}>
                {cat.name}
              </li>
            ))}
        </ul>
      </div>
      {/* {console.log(additionalData.programs, "HEYYYYY")} */}

      {additionalData && (
        <div className="additional-data-container">
          <h2> {additionalData.programs[0].programcategory.name}</h2>

          <ul>
            {additionalData.programs.map((dataItem, index) => (
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
