import axios from "axios";
import Swal from "sweetalert2";


export const setUser = (data,navigate) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/user/login", { Username: data.userName, Password: data.password }).then(x => {
            dispatch({ type: "SET_USER", payload: x.data });
            localStorage.setItem("userName", x.data.Name);
            localStorage.setItem("userId", x.data.Id);
            navigate(`/home`);
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "אופססס...",
                text: err.response.data
            });
            navigate('/');
        })
    }
}

export const addUser = (data,navigate) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/user/sighin", { Username: data.Username, Password: data.Password, Name: data.Name, Phone: data.Phone, Email: data.Email, Tz: data.Tz })
        .then(x => {
            dispatch({ type: "SET_USER", payload: x.data });
            localStorage.setItem("userName", x.data.Name);
            localStorage.setItem("userId", x.data.Id);
            navigate(`/home`);
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "אופססס...",
                text: err.response.data
            });
            navigate('/');
        });
    }
}
