import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dishImg from '../../assets/images/dish.jpg';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const response = await axios.post('http://localhost:3001/login', formData);
      console.log(response.data);
      alert('Signin successful!');
      localStorage.setItem('email', response.data.email);
      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.response) {
        alert(`Signin failed: ${error.response.data.message || error.response.statusText}`);
      } else {
        alert('Signin failed. Please try again.');
      }
    }
  };

 
  const handleSignUp = () => {
    navigate('/'); 
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dishImg})` }}>
        
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
     
      <div className="relative z-10 bg-white rounded shadow-lg w-3/5 flex">
       
        <div className="w-2/5 bg-green-700 flex items-center justify-center text-white p-10 rounded-l">
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome to Our Platform!</h2>
            <p className="text-lg">Enjoy delicious meals delivered to your doorstep.</p>
            <p className="text-lg mt-2">Sign in to explore more!</p>
          </div>
        </div>

        
        <div className="w-3/5 p-10 flex flex-col justify-center">
          <h2 className="text-3xl mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>

         
          <div className="mt-6 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <button
              type="button"
              onClick={handleSignUp}
              className="text-blue-500 hover:underline mt-2"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
