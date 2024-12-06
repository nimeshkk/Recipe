import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo2.png';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  return (
    <nav className="bg-gray-100 p-4 fixed top-0 left-0 w-full z-50"> 
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/">
          <img src={logo} alt="Logo" className="w-7 h-8" /> 
        </Link>

        
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/home" className="text-black hover:text-green-500">Home</Link>
          <Link to="/categorieslist" className="text-black hover:text-green-500">Categories</Link>
          <Link to="/favorites" className="text-black hover:text-green-500">Favorite</Link>
         

        </div>

        
        <div className="md:hidden">
          <button
            className="text-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 mt-4">
            <Link to="/home" className="text-black hover:text-green-500">Home</Link>
            <Link to="/categorieslist" className="text-black hover:text-green-500">Categories</Link>
            <Link to="/favorites" className="text-black hover:text-green-500">Favorites</Link>
          
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;


