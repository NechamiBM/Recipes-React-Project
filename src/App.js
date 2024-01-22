import { Route, Routes } from 'react-router-dom';
import './App.css';
import EnterPage from './User/EnterPage';
import Login from './User/Login';
import SignUp from './User/SignUp';
import Home from './Pages/Home';
import 'react-hook-form';
import AddRecipe from './Recipes/AddRecipe';
import Recipes from './Recipes/Recipes';
import Buy from './Pages/Buy';

function App() {
  return (
    <Routes>
      <Route path='/' element={<EnterPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/home' element={<Home />} />
      <Route path='/recipes/user' element={<Recipes />} />
      <Route path='/recipes' element={<Recipes />} />
      <Route path='/buy' element={<Buy />} />
      <Route path='/recipes/add' element={<AddRecipe />} />
      <Route path='/recipes/edit' element={<AddRecipe />} />
    </Routes>
  );
}

export default App;
