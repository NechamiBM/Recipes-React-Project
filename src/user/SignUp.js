import React from 'react'
import { Form, Icon, Input, Message, FormField, Label, FormGroup,Button} from 'semantic-ui-react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const schema = yup.object({
    Username: yup.string().required("חובה להכניס שם משתמש"),
    Password: yup.string().matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'סיסמא צריכה לכלול אותיות ומספרים').required("זהו שדה חובה"),
    Name: yup.string().required("זהו שדה חובה"),
    Phone: yup.string().matches(/^[0-9]{7,10}$/, 'על מספר טלפון לכלול בין 7 ל-10 ספרות').required("זהו שדה חובה"),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("זהו שדה חובה"),
    Tz: yup.string().matches(/^[0-9]{9}$/, 'תעודת זהות חייבת להיות מ- 9 ספרות בדיוק נמרץ!').required("זהו שדה חובה"),
}).required()

const SignUp = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    const onSubmit = data => {
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

    return (
        <div className='before'>
            <br />
            <div style={{ width: '60%', position: "absolute", left: "20%", backgroundColor: "rgba(255, 255, 255, 0.7)", padding: "10px" }}>
                <Message attached
                    header='ברוכים הבאים לאתר מתכונים'
                    content='אנא הכנס פרטים מדויקים!'
                />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup widths='equal'>
                        <FormField required>
                            <label>שם משתמש</label>
                            <input {...register("Username")} placeholder="שם משתמש" />
                            {errors.Username && <Label style={{ position: "absolute", top: 40, right: 50 }} color='red' pointing>{errors.Username.message} </Label>}
                        </FormField>
                        <FormField required>
                            <label>סיסמא</label>
                            <input type='password'{...register("Password")} placeholder="סיסמא" />
                            {errors.Password && <Label style={{ position: "absolute", top: 40, left: 80 }} color='red' pointing>{errors.Password.message} </Label>}
                        </FormField>
                    </FormGroup>
                    <FormField required>
                        <label>שם ומשפחה</label>
                        <input {...register("Name")} placeholder="שם ומשפחה" />
                        {errors.Name && <Label style={{ position: "absolute", top: 115, left: 110 }} color='red' pointing>{errors.Name.message} </Label>}
                    </FormField>
                    <FormField required>
                        <label>מספר פלאפון</label>
                        <input {...register("Phone")} placeholder="פלא'" />
                        {errors.Phone && <Label style={{ position: "absolute", top: 190, right: 140 }} color='red' pointing>{errors.Phone.message} </Label>}
                    </FormField>
                    <FormGroup widths='equal'>
                    <FormField required>
                        <label>כתובת אימייל</label>
                        <input {...register("Email")} placeholder="כתובת דואר אלקטרוני" />
                        {errors.Email && <Label style={{ position: "absolute", top: 265, right: 70 }} color='red' pointing>{errors.Email.message} </Label>}
                    </FormField>
                    <FormField required>
                        <label>מספר זהות</label>
                        <input {...register("Tz")} placeholder="מספר זהות" />
                        {errors.Tz && <Label style={{ position: "absolute", top: 270, left: 30, zIndex: 2 }} color='red' pointing>{errors.Tz.message} </Label>}
                    </FormField>
                    </FormGroup>
                    <Button type="submit" content='הרשמה' color='teal' />
                </Form>
                <br></br>
                <Message attached='bottom' warning>
                    <Icon name='help' />
                    יש לך חשבון?&nbsp;<Link to="/login">הכנס כאן</Link>&nbsp;במקום.
                </Message>
            </div >
        </div >
    )
}

export default SignUp