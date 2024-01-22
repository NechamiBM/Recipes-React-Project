import axios from "axios";
import Swal from "sweetalert2";

export const getRecipesList = () => {
    return dispach =>
        axios.get("http://localhost:8080/api/recipe").then((x) => {
            dispach({ type: "SET_RECIPES", payload: x.data });
        }).catch(err => console.error(err));
}

export const deleteRecipe = (recipe) => {
    return dispatch => {
        Swal.fire({
            title: "אין אפשרות לשחזר!",
            text: "האם למחוק סופית את " + recipe.Name + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "ביטול",
            confirmButtonText: "כן, אני רוצה למחוק!"
        }).then(result => {
            if (result.isConfirmed) {
                axios.post(`http://localhost:8080/api/recipe/delete/${recipe.Id}`)
                    .then(() => {
                        dispatch({ type: "DELETE_RECIPE", payload: recipe.Id })
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: recipe.Name + " נמחק בהצלחה!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }).catch(err => console.error(err))
            }
        })
    }
}

export const addRecipe = (data) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe', data)
        .then(() => {
            dispatch({ type: "ADD_RECIPE", payload: data });
            Swal.fire({
                icon: "success",
                title: data.Name + " נוסף בהצלחה!",
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch((err) => { 
            console.error(err);
            Swal.fire({
                icon: "error",
                title: err.response.data,
                showConfirmButton: false,
                timer: 1500
            });
         })
}

export const editRecipe = (data, selectRecipe) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe/edit', { ...data, UserId: selectRecipe?.UserId, Id: selectRecipe?.Id })
        .then((response) => {
            dispatch({ type: "EDIT_RECIPE", payload: response.data })
        }).catch((err) => { console.error(err) })
}