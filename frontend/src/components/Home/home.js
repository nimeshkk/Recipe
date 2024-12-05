import React, { useState, useEffect } from "react";
import axios from "axios";

const Home= () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories from the API
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

  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchRecipes(category);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Recipe Explorer</h1>

     
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
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{recipe.strMeal}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
