import { Button, Card, CardContent, Icon, Image, CardDescription, CardHeader } from "semantic-ui-react";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../Services/RecipesService";
import { addToCart } from "../Services/ShoppingService";
import { getCategoryList } from "../Services/CategoryService";

const Recipe = ({ recipe }) => {
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
        <Card color='teal' style={{ width: "20%" }} >
            <Button disabled={userid != recipe.UserId} style={{ position: "absolute", top: 10, left: 10, zIndex: 1, width: 50 }} color='blue' icon='edit' onClick={() => { }} />
            <Button disabled={userid != recipe.UserId} style={{ position: "absolute", top: 10, left: 70, zIndex: 1, width: 50 }} color='green' icon='trash alternate' onClick={() => dispatch(deleteRecipe(recipe))} />

            <Image wrapped src={recipe.Img} size="large" className="recipe-img" />
            <CardContent>
                <CardHeader >{recipe.Name}</CardHeader>
                <CardDescription>{recipe.Description}</CardDescription>
                <br></br>
                <b>רכיבים:</b>
                {recipe.Ingrident.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Button style={{ marginLeft: "10px" }} inverted color='teal' circular icon='plus cart' onClick={() => dispatch(addToCart(x))} />{x.Count} {x.Type} {x.Name} </div>)}
                <br></br>
                <b>הוראות הכנה:</b> {recipe.Instructions.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Icon style={{ margin: "10px" }} color='blue' name="heart outline" /> {x}</div>)}
            </CardContent>
            <CardContent extra>
                <span>
                    <Icon color='teal' name='align justify' />
                    {" " + categoryList?.find(c => c.Id === recipe.CategoryId)?.Name + " "}
                </span>
                <span>
                    <Icon color='teal' name='hourglass half' />
                    {" " + recipe.Duration + " דקות "}
                </span>
                <span>
                    <Icon color='teal' name='sliders horizontal' />
                    {" " + difficultyList?.find(d => d.Id === recipe.Difficulty)?.Name + " "}
                </span>
            </CardContent>
        </Card>
    )
}

export default Recipe