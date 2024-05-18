import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../AuthProvider/AuthProvider";
import '../Register/Register.scss';
import FlashMessage from "../FlashMessage/FlashMessage";
import { images } from '../../constants';
import { baseURL, appURL } from "../../config/api";

function Login() {

    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();                                //initialize useNavigate
    const [flashMessage, setFlashMessage] = useState(null);

    const [formValue, setformValue] = React.useState({
        email: '',
        password: ''
    });

    // console.log('formValue:', formValue);

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        axios.post(`${baseURL}/user/login`, {
            email: formValue.email,
            password: formValue.password,
        })
            .then(response => {
                console.log("Response:", response);

                if (response.status === 200) {
                    
                    setFlashMessage({ type: 'success', message: 'Login successful.' });
                    // window.location.href = `${appURL}`;
                    // login authenticated to protected area
                    navigate('/Admin')
                    // hiding register login from header
                    setIsLoggedIn(true);
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 404) {
                        // Handle user not found
                        console.error('User not found');
                        setFlashMessage({ type: 'error', message: 'User not found' });
                        // window.location.href = 'http://localhost:3001/Login';

                    } else if (error.response.status === 401) {
                        // Handle authentication failure
                        console.error('Authentication failed');
                        setFlashMessage({ type: 'error', message: 'Authentication failed' });
                        window.location.href = `${appURL}/Login`;

                    } else {
                        // Handle other errors
                        console.error('Error:', error.response);
                    }
                } else {
                    // Handle network or request errors
                    console.error('Network or request error:', error);
                }
            });
    }

    return (
        <div className="Login-page">

            {flashMessage &&
                <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

            <form className="form_container" id="login-form" onSubmit={handleFormSubmit}>
                <div className="logo_container">
                    <img src={images.logo} alt="Khaao"></img>
                </div>
                <div className="title_container">
                    <p className="title">Login to your Account</p>
                    <span className="subtitle">Welcome back, just sigin and enjoy the experience</span>
                </div>
                <br />
                <div className="input_container">
                    <label className="input_label" htmlFor="email_field">Email</label>
                    <img className="icon" src={images.email} viewBox='0 0 24 24'></img>
                    <input
                        className="input_field"
                        placeholder="name@gmail.com"
                        name="email"
                        type="text"
                        id="email_field"
                        value={formValue.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input_container">
                    <label className="input_label" htmlFor="password_field">Password</label>
                    <img className="icon" src={images.password} viewBox='0 0 24 24'></img>
                    <input
                        className="input_field"
                        placeholder="Password"
                        name="password"
                        type="password"
                        id="password_field"
                        value={formValue.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <a className="forget_password" href="#">Forgot password?</a>
                <button title='Sign In' type='submit' className='sign-in_btn'><span>Log In</span></button>
                <div className="new_to_account">
                    <h4 >New to Khaao?<Link to="/register">Create Account</Link></h4>
                </div>
            </form>
        </div>
    );
}

export default Login;