import axios from "axios";
import Swal from 'sweetalert2';

const userId = localStorage.getItem("userId");

export const getShopingList = () => {
    return dispach => axios.get(`http://localhost:8080/api/bay/${userId}`).then(res => {
        dispach({ type: "SET_SHOPPINGLIST", payload: res.data });
    }).catch((error) => {
        console.error(error);
    });
}

export const updateCount = (product, count) => {
    return dispatch => {
        if (product.Count + count == 0) {
            Swal.fire({
                title: "למחוק סופית?",
                text: product.Name + " יוסר מהרשימה שלך",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "ביטול",
                confirmButtonText: "כן, אני רוצה למחוק!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`http://localhost:8080/api/bay/delete/${product.Id}`)
                        .then((res) => {
                            dispatch({ type: "DELETE_PRODUCT", payload: { Name: product.Name, user: product.UserId, Id: product.Id } });
                            Swal.fire({
                                title: "נמחק!",
                                text: product.Name + " הוסר מרשימת הקניות שלך",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }).catch((err) => {
                            Swal.fire({
                                icon: "error",
                                title: "אופסססס...",
                                text: err.response.data,
                                confirmButtonText: "😭😭😭"
                            });
                        });
                }
            });
        }
        else {
            axios.post(`http://localhost:8080/api/bay/`, { Name: product.Name, UserId: product.UserId, Count: count }).then(res => {
                dispatch({ type: "EDIT_PRODUCT", payload: { Name: product.Name, UserId: product.UserId, Count: res.data.Count } })
            }).catch((err) => {
                console.error(err, "err");
            })
        }
    }
}