import Header from '../Header';
import { GridColumn, GridRow, CardGroup } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import Recipe from './Recipe'
const Recipes = () => {
    const recipesList = useSelector(state => state?.recipes);
    const selectedCategory = useSelector(state => state.SelectedCategory)
    const dispatch = useDispatch();

    useEffect(function () {
        axios.get("http://localhost:8080/api/recipe").then((x) => {
            console.log(x.data);
            dispatch({ type: "GET_RECIPES", payload: x.data })            
        }
        ).catch(err => console.log(err))
    }, []);

    return (

        <div>
            <Header page={'מתכונים'} />
            <CardGroup style={{justifyContent:"center"}}>
                {recipesList.map((recipe) => (
                    <Recipe key={recipe.Id} recipe={recipe} />
                ))}
            </CardGroup>
        </div>
    )
}

export default Recipes;
