import { Navbar } from "../Navbar/Navbar";
import { useState } from "react";
export const Categories = (props) => {
  const { programcategories } = props.categorieData;
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await fetch(
        `https://api.sr.se/api/v2/programs/index?programcategoryid=${categoryId}&format=json`
      );
      const additionalData = await response.json();

      console.log(
        "Additional data for category ID",
        categoryId,
        ":",
        additionalData
      );
    } catch (error) {
      console.error("Error fetching additional data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <ul>
        {programcategories &&
          programcategories.map((cat, index) => (
            <li key={index} onClick={() => handleCategoryClick(cat.id)}>
              {cat.name}
            </li>
          ))}
      </ul>
      <ul></ul>
    </>
  );
};
