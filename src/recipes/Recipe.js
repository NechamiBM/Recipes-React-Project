import { Button, Card, CardContent, Icon, Image, CardDescription, Rating, CardHeader, Modal, Label } from "semantic-ui-react";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../Services/RecipesService";
import { addToCart } from "../Services/ShoppingService";
import { getCategoryList } from "../Services/CategoryService";
import { useNavigate } from "react-router-dom";

const Recipe = ({ recipe, isClosed = true }) => {
    const navigate = useNavigate();
    const userid = localStorage.getItem("userId");
    const { difficultyList, categoryList } = useSelector(state => ({
        difficultyList: state.difficulties,
        categoryList: state.categoryList
    }));
    const dispatch = useDispatch();
    useEffect(() => {
        if (!categoryList.length)
            dispatch(getCategoryList());
    }, []);

    return (
        <Card color='teal' style={{ width: isClosed ? '23%' : '100%' }} >
            <Button disabled={userid != recipe.UserId} style={{ position: "absolute", top: 10, left: 10, zIndex: 1, width: 50 }} color='blue' icon='edit' onClick={() => { navigate('/recipes/edit', { state: recipe }) }} />
            <Button disabled={userid != recipe.UserId} style={{ position: "absolute", top: 10, left: 70, zIndex: 1, width: 50 }} color='green' icon='trash alternate' onClick={() => dispatch(deleteRecipe(recipe))} />
            {!isClosed && <Button style={{ position: "absolute", top: 10, left: 130, zIndex: 1, width: 50 }} color='yellow' icon='print' onClick={() => (window.print())} />}
            <Image wrapped src={recipe.Img} size="large" className="recipe-img" />
            <CardContent>
                <CardHeader >{recipe.Name}</CardHeader>
                <CardDescription>{recipe.Description}</CardDescription>
                <br></br>
                {!isClosed ? <>
                    <b>רכיבים:</b>
                    {recipe.Ingrident.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Button style={{ marginLeft: "10px" }} inverted color='teal' circular icon='plus cart' onClick={() => dispatch(addToCart(x))} />{x.Count} {x.Type} {x.Name} </div>)}
                    <br></br>
                    <b>הוראות הכנה:</b> {recipe.Instructions.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Icon style={{ margin: "10px" }} color='blue' name="heart outline" /> {x}</div>)}
                </> : <Modal
                    size='mini'
                    trigger={<Button color="orange" content='לפרטים' icon='left arrow' labelPosition='left' />} >
                    <Recipe recipe={recipe} isClosed={false} />
                </Modal>}
            </CardContent>
            <Rating icon='star' defaultRating={3} maxRating={3} style={{ width: "20%", margin: "6px 10px" }} />
            <CardContent extra style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Label as='a' tag style={{ marginLeft: "15px", padding: "7px 17px 6px 12px" }}>
                    <Icon style={{ marginLeft: "5px", marginRight: "-10px" }} color='blue' name='align justify' />
                    {categoryList?.find(c => c.Id === recipe.CategoryId)?.Name}
                </Label>
                <Label as='a' tag style={{ marginLeft: "15px", padding: "7px 17px 6px 12px" }}>
                    <Icon style={{ marginLeft: "5px", marginRight: "-10px" }} color='teal' name='hourglass half' />
                    {recipe.Duration + " דקות"}
                </Label>
                <Label as='a' tag style={{ padding: "7px 17px 6px 12px" }}>
                    <Icon style={{ marginLeft: "5px", marginRight: "-10px" }} color='green' name='sliders horizontal' />
                    {difficultyList?.find(d => d.Id === recipe.Difficulty)?.Name}
                </Label>
            </CardContent>
        </Card>
    )
}

export default Recipe;