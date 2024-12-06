
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Sign Up/signup';
import Signin from './components/Sign In/Signin';
import Home from './components/Home/home';
import CategoriesList from './components/CategoriesList/CategoriesList';
import MealDetails from './components/MealDetails/mealDetails';
import FavoriteRecipes from './components/favorite/favorite';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="home" element={<Home />} />
        <Route path="categorieslist" element={<CategoriesList />} />
        <Route path="/meal/:idMeal" element={<MealDetails />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
