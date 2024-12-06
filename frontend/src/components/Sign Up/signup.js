import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        formData
      );
      console.log("Signup successful:", response.data);
      setSuccess("User registered successfully!");
      setError("");
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Failed to register. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-300 px-4">
    
      <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-full sm:w-4/5 md:w-3/5 lg:w-2/5 p-6 md:p-10 flex flex-col">
       
        <h2 className="text-2xl mb-1 text-center text-pink-600 font-bold">
          COOK
        </h2>
        <h1 className="text-xl mb-6 text-left font-semibold">Sign Up</h1>

       
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition duration-200"
          >
            Sign Up
          </button>

          
          <div className="mt-4 text-center">
            <p className="text-gray-600">If you already have an account?</p>
            <button
              type="button"
              onClick={handleSignIn}
              className="text-pink-500 font-semibold hover:underline mt-1"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
