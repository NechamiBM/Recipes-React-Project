import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Icon, Form, Input } from 'semantic-ui-react'
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
    const navigate = useNavigate()
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
                <input {...register("userName")} placeholder="שם משתמש" />
                <p style={{ color: "red" }}>{errors.userName?.message}</p>

                <input type='password'{...register("password")} placeholder="סיסמא" />
                <p style={{ color: "red" }}>{errors.password?.message}</p>

                <Input type='submit' color="teal" />
            </Form>
            <br></br>
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