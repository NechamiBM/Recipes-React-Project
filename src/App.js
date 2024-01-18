import { Route, Routes } from 'react-router-dom';
import './App.css';
import EnterPage from './user/EnterPage';
import Login from './user/Login';
import SignUp from './user/SignUp';
import Home from './Home';
import Recipe from './recipes/Recipe';
import 'react-hook-form';
import AddRecipe from './recipes/addRecipe';
import Recipes from './recipes/Recipes';
import Buy from './Buy';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<EnterPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/userrecipes' element={<Recipes />} />
        <Route path='/allRecipes' element={<Recipes />} />
        <Route path='/buy' element={<Buy />} />
        <Route path='/addRecipe' element={<AddRecipe />} />
        <Route path='/addCategory' element={<Recipe recipe={
          { "Id": 4, "Name": "סורבה אבטיח", "UserId": 3, "CategoryId": 3, "Img": "https://www.10dakot.co.il/wp-content/uploads/2017/05/%E2%80%8F%E2%80%8FDSC_0005-%D7%A2%D7%95%D7%AA%D7%A7.jpg", "Duration": 10, "Difficulty": 1, "Description": "קינוח סורבה אבטיח ביתי מרענן וטעים ב-3 מצרכים בלבד!", "Ingrident": [{ "Name": "חצי אבטיח בינוני-גדול חתוך לקוביות", "Count": "", "Type": "" }, { "Name": "מיץ תפוזים", "Count": "1/4", "Type": "כוס" }, { "Name": "לא חובה תלוי במתיקות האבטיח -אבקת סוכר", "Count": "1-2", "Type": "כפות" }], "Instructions": ["שמים את קוביות האבטיח בשקית אטומה ומקפיאים.", "מניחים במעבד מזון את קוביות האבטיח הקפואות ומיץ התפוזים וטוחנים עד למרקם רך של סורבה (בין ברד לגלידה).", "טועמים. אם חסרה מתיקות מוסיפים אבקת סוכר לפי הטעם ומערבבים היטב."] }
        } />} />
      </Routes>
    </>
  );
}

export default App;
