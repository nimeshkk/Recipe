import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", formData);
      console.log(response.data);
      alert("Signin successful!");
      localStorage.setItem("email", response.data.email);
      navigate("/home");
    } catch (error) {
      console.error("Error signing in:", error);
      if (error.response) {
        alert(
          `Signin failed: ${error.response.data.message || error.response.statusText}`
        );
      } else {
        alert("Signin failed. Please try again.");
      }
    }
  };

  const handleSignUp = () => {
    navigate("/");
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-md sm:w-3/4 lg:w-1/3 p-6 md:p-10 flex flex-col">

        <h2 className="text-3xl mb-6 text-center text-pink-600 font-bold">COOK</h2>

       
        <h3 className="text-xl mb-6 text-left font-semibold">Sign In</h3>

       
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
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
            Sign In
          </button>
        </form>

       
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            type="button"
            onClick={handleSignUp}
            className="text-pink-500 font-semibold hover:underline mt-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
