import { Button, Card, CardContent, Icon, Image, CardDescription, CardHeader } from "semantic-ui-react";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import Swal from 'sweetalert2'

const Recipe = ({ recipe }) => {
    const [categories, setCategories] = useState([]);
    const userid = localStorage.getItem("userId");
    const difficultyList = [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }]

    useEffect(function () {
        axios.get("http://localhost:8080/api/category").then((response) => {
            setCategories(response.data);
            console.log(userid);
        }).catch(err => console.log(err))
    }, []);

    const AddToCart = (product) => {
        axios.post(`http://localhost:8080/api/bay`, { Name: product, Count: 1, UserId: userid })
            .then(() => {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: product + "\n" + "נוסף בהצלחה לרשימת הקניות שלך",
                    showConfirmButton: false,
                    timer: 2000
                });
            })
            .catch(err => console.log(err.response))
    }

    const deleteRecipe = () => {
        Swal.fire({
            title: " האם למחוק סופית את?",
            text: recipe.Name + "אין אפשרות לשחזר",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "ביטול",
            confirmButtonText: "כן, אני רוצה למחוק!"
        }).then(result => {
            if (result.isConfirmed) {
                axios.post(`http://localhost:8080/api/recipe/delete/${recipe.Id}`)
                    .then((response) => {
                        console.log(response.data);
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: recipe.Name + "נמחק בהצלחה!",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    })
                    .catch(err => console.log(err))
            }
        })
    }
    return (

        <Card color='teal' style={{ width: "20%" }} >
            {userid == recipe.UserId && <>
                <Button style={{ position: "absolute", top: 10, left: 10, zIndex: 1, width: 50 }} inverted color='grey' icon='edit' onClick={() => { }} />
                <Button style={{ position: "absolute", top: 10, left: 70, zIndex: 1, width: 50 }} inverted color='teal' icon='trash alternate' onClick={() => deleteRecipe()} />
            </>}
            <Image wrapped src={recipe.Img} size="large" className="recipe-img" />
            <CardContent>
                <CardHeader >{recipe.Name}</CardHeader>
                <CardDescription>{recipe.Description}</CardDescription>
                <br></br>
                <b>רכיבים:</b>
                {recipe.Ingrident.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Button style={{ marginLeft: "10px" }} inverted color='teal' circular icon='plus cart' onClick={() => AddToCart(x.Name)} />   {x.Count} {x.Type} {x.Name} </div>)}
                <br></br>
                <b>הוראות הכנה:</b> {recipe.Instructions.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Icon style={{ margin: "10px" }} color='teal' name="heart outline" /> {x}</div>)}

            </CardContent>
            <CardContent extra>
                <span>
                    <Icon color='teal' name='align justify' />
                    {" " + categories?.find(c => c.Id === recipe.CategoryId)?.Name + " "}
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