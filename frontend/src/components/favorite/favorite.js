// FavoriteRecipes.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (idMeal) => {
    const updatedFavorites = favorites.filter((fav) => fav.idMeal !== idMeal);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const handleRecipeClick = (idMeal) => {
    navigate(`/meal/${idMeal}`);
  };

  return (
    <>
    <NavBar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p className="text-center">No favorite recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((recipe) => (
            <div
              key={recipe.idMeal}
              onClick={() => handleRecipeClick(recipe.idMeal)}
              className="border rounded-lg overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{recipe.strMeal}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleRemoveFavorite(recipe.idMeal);
                  }}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Remove Favorite
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default FavoriteRecipes;
