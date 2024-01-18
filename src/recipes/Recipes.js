import Header from '../Pages/Header';
import { CardGroup, Segment, Input, Select, Label, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Recipe from './Recipe';
import { getRecipesList } from '../Services/RecipesService';
import { useLocation } from 'react-router-dom';
import { getCategoryList } from '../Services/CategoryService';

const Recipes = () => {
    const userId = localStorage.getItem("userId");
    const path = useLocation().pathname;
    const { recipesList, categoryList } = useSelector(state => ({
        recipesList: state.recipes.filter(r => path === '/allRecipes' || r.UserId == userId),
        categoryList: state.categoryList
    }));

    const [categoty, setCategoty] = useState('none');
    const [duration, setDuration] = useState(null);
    const [difficulty, setDifficulty] = useState('none');
    const difficultyList = useSelector(state => state.difficulties);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!recipesList.length)
            dispatch(getRecipesList());
        if (!categoryList.length)
            dispatch(getCategoryList());
    }, []);

    return (
        <div>
            <Header page={path === '/allRecipes' ? 'מתכונים' : 'המתכונים שלי'} />

            <Segment inverted color='teal' tertiary style={{ width: "80%", margin: "auto", opacity: "70%", zIndex: "2", display: "flex", justifyContent: "space-evenly" }}>
                <Select icon='align justify' onChange={(_, { value }) => setCategoty(value)}
                    options={[{ key: 'none', value: 'none', text: 'קטגוריה' },
                    ...categoryList.map(c => ({ key: c.Id, value: c.Id, text: c.Name })),
                    ]} defaultValue='none' />

                <Input style={{ direction: "ltr" }} labelPosition='left' type='text' placeholder='זמן הכנה מקסימלי'>
                    <Label basic style={{borderRight:"none"}}>דקות<Icon name='hourglass half' /></Label>
                    <input style={{ width: "150px" }} type='number' min='0' onChange={(e) => setDuration(e.target.value)} />
                </Input>

                <Select icon='sliders horizontal' onChange={(_, { value }) => setDifficulty(value)}
                    options={[{ key: 'none', value: 'none', text: 'רמת קושי' },
                    ...difficultyList.map(c => ({ key: c.Id, value: c.Id, text: c.Name })),
                    ]} defaultValue='none' />
            </Segment>

            <br />

            <CardGroup style={{ justifyContent: "center" }}>
                {recipesList.map(recipe =>
                    (!duration || parseInt(duration) >= parseInt(recipe.Duration)) &&
                    (difficulty === 'none' || difficulty === recipe.Difficulty) &&
                    (categoty === 'none' || parseInt(categoty) === recipe.CategoryId) &&
                    <Recipe key={recipe.Id} recipe={recipe} />
                )}
            </CardGroup>
        </div>
    )
}

export default Recipes;
