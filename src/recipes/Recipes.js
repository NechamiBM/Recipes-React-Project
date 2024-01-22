import Header from '../Pages/Header';
import { CardGroup, Segment, Input, Select, Checkbox, Button, Label, Icon, SidebarPusher, Menu, MenuItem, Sidebar, SidebarPushable } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Recipe from './Recipe';
import { getRecipesList } from '../Services/RecipesService';
import { useLocation } from 'react-router-dom';
import { getCategoryList } from '../Services/CategoryService';

const Recipes = () => {
    const [visible, setVisible] = useState(false);
    const userId = localStorage.getItem("userId");
    const path = useLocation().pathname;
    const { recipesList, categoryList } = useSelector(state => ({
        recipesList: state.recipes.filter(r => path === '/recipes' || r.UserId == userId),
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
            <Header page={path === '/recipes' ? 'מתכונים' : 'המתכונים שלי'} />
            <Checkbox toggle checked={visible} label="הצג/הסתר סינונים" onChange={(_, data) => setVisible(data.checked)} />
            <SidebarPushable as={Segment} style={{ minHeight: "550px" }}>
                <Sidebar as={Menu} animation='overlay' inverted tertiary direction='right' icon='labeled' onHide={() => setVisible(false)} vertical visible={visible} width='thin' style={{ width: "20%", opacity: "90%" }}>
                    <MenuItem><h2>סנן לפי</h2></MenuItem>
                    <MenuItem style={{ padding: "25px 0" }}>
                        <Icon name='align justify' />
                        <Select onChange={(_, { value }) => setCategoty(value)}
                            options={[{ key: 'none', value: 'none', text: 'קטגוריה' },
                            ...categoryList.map(c => ({ key: c.Id, value: c.Id, text: c.Name })),
                            ]} defaultValue='none' />
                    </MenuItem>
                    <MenuItem style={{ padding: "25px 60px 25px 50px" }}>
                        <Icon name='hourglass half' />
                        <Input style={{ direction: "ltr" }} labelPosition='left' type='text' placeholder='זמן הכנה מקסימלי'>
                            <Label basic style={{ borderRight: "none" }}>דקות</Label>
                            <input style={{ width: "10%" }} type='number' min='0' onChange={(e) => setDuration(e.target.value)} />
                        </Input>
                    </MenuItem>
                    <MenuItem style={{ padding: "25px 0" }}>
                        <Icon name='sliders horizontal' />
                        <Select onChange={(_, { value }) => setDifficulty(value)}
                            options={[{ key: 'none', value: 'none', text: 'רמת קושי' },
                            ...difficultyList.map(c => ({ key: c.Id, value: c.Id, text: c.Name })),
                            ]} defaultValue='none' />
                    </MenuItem>
                    <MenuItem style={{ padding: "25px 55px" }}>
                        <Icon name='undo' />
                        <Button color='teal' style={{ width: "100%" }} onClick={() => { setCategoty('none'); setDuration(null); setDifficulty('none'); }}>לאיפוס סינון</Button>
                    </MenuItem>
                </Sidebar>
                <SidebarPusher>
                    <Segment basic>
                        <CardGroup style={{ justifyContent: "center" }}>
                            {recipesList.map(recipe =>
                                (!duration || parseInt(duration) >= parseInt(recipe.Duration)) &&
                                (difficulty === 'none' || difficulty === recipe.Difficulty) &&
                                (categoty === 'none' || parseInt(categoty) === recipe.CategoryId) &&
                                <Recipe key={recipe.Id} recipe={recipe} />
                            )}
                        </CardGroup>
                    </Segment>
                </SidebarPusher>
            </SidebarPushable>
        </div >
    )
}

export default Recipes;
