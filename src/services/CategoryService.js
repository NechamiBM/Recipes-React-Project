import axios from "axios";

export const getCategoryList = () => {
    return dispatch =>
        axios.get('http://localhost:8080/api/category').then((res) => {
            dispatch({ type: "SET_CATEGORIES", payload: res.data })
        }).catch((err) => console.error(err));
}