import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Sign Up/signup';
import Signin from './components/Sign In/Signin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
