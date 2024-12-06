import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);

 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const allCategories = response.data.categories;
        
        setCategories(allCategories.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
    <NavBar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Top Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.idCategory}
            className="border rounded-lg p-4 shadow-lg text-center"
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{category.strCategory}</h2>
            <p className="text-gray-600 text-sm">{category.strCategoryDescription.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CategoriesList;
