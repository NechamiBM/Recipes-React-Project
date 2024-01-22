import axios from "axios";

export const getCategoryList = () => {
    return dispatch =>
        axios.get('http://localhost:8080/api/category').then((res) => {
            dispatch({ type: "SET_CATEGORIES", payload: res.data })
        }).catch((err) => console.error(err));
}

export const addCategory = (category) => {
    return dispatch =>
        axios.post(`http://localhost:8080/api/category`, { Name: category })
            .then((res) => {
                dispatch({ type: "ADD_CATEGORY", payload: res.data })
            }).catch((err) => console.error(err));
}