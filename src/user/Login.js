import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Icon, Form, Input, Label } from 'semantic-ui-react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const schema = yup.object({
    userName: yup.string().required("זהו שדה חובה"),
    password: yup.string().required("יש להכניס סיסמא"),
}).required()

const Login = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    const onSubmit = (data) => {
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
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: 'auto' }}>
                <input style={{ marginTop: "20px" }} {...register("userName")} placeholder="שם משתמש" />
                {errors.userName && <Label style={{ position: "absolute", top: 35, left: 50 }} color='red' pointing>{errors.userName.message} </Label>}
                <input style={{ marginTop: "10px" }} type='password'{...register("password")} placeholder="סיסמא" />
                {errors.password && <Label prompt style={{ position: "absolute", bottom: 35, right: 50 }} color='red' pointing>{errors.password.message} </Label>}
                <br />
                <br />
                <Input type='submit' />
            </Form>
            <br />
            <Link to='/signup' >
                <Button animated>
                    <Button.Content visible>אין לך חשבון?</Button.Content>
                    <Button.Content hidden>
                        הרשם<Icon name='arrow left' />
                    </Button.Content>
                </Button>
            </Link>
        </>
    );
}

export default Login