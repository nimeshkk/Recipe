import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MealDetails = () => {
    const { idMeal } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await axios.get(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
                );
                setMeal(response.data.meals[0]);
            } catch (error) {
                console.error("Error fetching meal details:", error);
            }
        };

        fetchMealDetails();
    }, [idMeal]);

    if (!meal) {
        return <p className="text-center text-lg font-semibold">Loading meal details...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            
            <header className=" py-4">
                <h1 className="text-2xl font-bold text-center text-black">{meal.strMeal}</h1>
            </header>

            {/* Meal Image */}
            <div className="my-4 flex justify-center">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-1/3 max-h-[200px] object-cover rounded-lg shadow-md"
                />
            </div>


            {/* Meal Details */}
            <div className="px-4 md:px-20 lg:px-32 py-4">
                {/* Category and Area */}
                <div className="flex flex-wrap justify-between text-gray-700 text-lg mb-6">
                    <p>
                        <strong>Category:</strong> {meal.strCategory}
                    </p>
                    <p>
                        <strong>Area:</strong> {meal.strArea}
                    </p>
                </div>

                {/* Instructions */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
                    <p className="text-gray-700 leading-relaxed">{meal.strInstructions}</p>
                </section>

            </div>
        </div>
    );
};

export default MealDetails;
