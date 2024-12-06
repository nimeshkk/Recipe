// Home.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // New state for message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecipes = async (category) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setRecipes(response.data.meals);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes(selectedCategory);
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleRecipeClick = (idMeal) => {
    navigate(`/meal/${idMeal}`);
  };

  const handleFavoriteToggle = (recipe) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      setMessage("Removed from favorites!");
    } else {
      favorites.push(recipe);
      setMessage("Added to favorites!");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Recipe Explorer</h1>

        {message && (
          <div className="bg-green-500 text-white text-center p-2 rounded mb-4">
            {message}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category.idCategory}
              onClick={() => handleCategorySelect(category.strCategory)}
              className={`px-4 py-2 rounded-lg border ${
                selectedCategory === category.strCategory
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category.strCategory}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center">Loading recipes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((recipe) => (
              <div
                key={recipe.idMeal}
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
                      handleFavoriteToggle(recipe);
                    }}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Add/Remove
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRecipeClick(recipe.idMeal);
                    }}
                    className="mt-2 ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    View Details
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

export default Home;
