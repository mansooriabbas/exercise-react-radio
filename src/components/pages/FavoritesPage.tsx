// FavoritesPage.js
import React, { useContext } from "react";
import Context from "../../Context";
import { Navbar } from "../Navbar/Navbar";
import "./FavoritesPages.css"

const FavoritesPage = () => {
  const { favorites } = useContext(Context);
  console.log(favorites, "From Favorites")
  return (
    <div>
      <Navbar />
      <div className="favorite-container">

      <h2>Your Favorites</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((fav) => (
              <li key={fav.id}>
              <img src={fav.programimage} alt="" />
              <div className="text-container">
                <p>{fav.name}</p>
                <p>{fav.channel.name}</p>
                <p>{fav.description}</p>
                <p>{fav.schedule}</p>
                {/* Add other details you want to display */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <p>No favorites yet. Add some from the SearchPage!</p>
          )}
    </div>
          </div>
  );
};

export default FavoritesPage;
