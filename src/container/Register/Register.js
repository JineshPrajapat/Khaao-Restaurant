import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import FlashMessage from "../FlashMessage/FlashMessage";
import './Register.scss'
import { images } from '../../constants'

function Register() {

    const [flashMessage, setFlashMessage] = useState(null);

    const [formValue, setformValue] = useState({
        name: '',
        phone_number: '',
        email:'',
        password:''
    });

    const handleChange = (event) =>{
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleFormSubmit = async (event) =>{
        event.preventDefault();

        axios.post("http://localhost:3000/Register",{
            name: formValue.name,
            phone_number: formValue.phone_number,
            email: formValue.email,
            password: formValue.password,
        })
            .then(response => {
                console.log("Response: ", response);

                if(response.status === 200){
                    //  successful registration flash message
                    setFlashMessage({type: 'success', message:'Registration Successfull'});
                }
            })
            .catch(error =>{
                if(error.response){
                    if(error.response.status === 400){
                        // handle already registered
                        console.error('Already registered');
                        setFlashMessage({type:'error', message:'Already registered'});
                        window.location.href = 'http://localhost:3001/Login';
                    }
                    else {
                        //handle other error
                        console.error('Error:', error);
                       
                    }
                } else{
                    // handle network or request error
                    console.error('Network or request error:', error);
                }
            })
    }


    return (
        <div className='Login-page'>
            
            {flashMessage &&
                <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

            <form className='form_container' onSubmit={handleFormSubmit}>
                <div className='logo_container'>
                    <img src={images.logo} alt='Khaao' />
                </div>
                <div className='title_container'>
                    <p className='title'>Get Started by Registering an Account</p>
                    <span className='subtitle'>Get started with our app, just create an account and enjoy the experience</span>
                </div>
                <br />
                <div className='input_container'>
                    <label className='input_label' htmlFor='user_field'>Username</label>
                    <img className='icon' src={images.email} viewBox='0 0 24 24'></img>
                    <input
                        className='input_field'
                        placeholder='Username'
                        name='name'
                        type='text'
                        id='user_field'
                        value={formValue.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='input_container'>
                    <label className='input_label' htmlFor='phone_number_field'>Phone Number</label>
                    <img className='icon' src={images.email} viewBox='0 0 24 24'></img>
                    <input
                        className='input_field'
                        placeholder='Phone Number' 
                        title='Input title' 
                        name='phone_number' 
                        type='tel' 
                        id='phone_number_field' 
                        value={formValue.phone_number}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className='input_container'>
                    <label className='input_label' htmlFor='email_field'>Email</label>
                    <img className='icon' src={images.email} viewBox='0 0 24 24'></img>
                    <input 
                        className='input_field' 
                        placeholder='name@mail.com' 
                        title='Input title' 
                        name='email' 
                        type='text' 
                        id='email_field' 
                        value={formValue.email}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className='input_container'>
                    <label className='input_label' htmlFor='password_field'>Password</label>
                    <img className='icon' src={images.password} viewBox='0 0 24 24'></img>
                    <input 
                        className='input_field' 
                        placeholder='Password' 
                        title='Input title' 
                        name='password' 
                        type='password' 
                        id='password_field' 
                        value={formValue.password}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <button title='Sign In' type='submit' className='sign-in_btn'><span>Sign In</span></button>
                <div className='separartor'>
                    {/* <hr className='line'/> */}
                    <span>Or</span>
                    {/* <hr className='line'/> */}
                </div>
                <button title='Sign In' type='submit' className='sign-in_ggl'><span>Sign In with Google</span></button>
                <button title='Sign In' type='submit' className='sign-in_apl'>
                    <svg height={20} width={16} xmlns='http;//www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYmid' viewBox='0 0 256 315'></svg>
                    <span>Sign In with Apple</span>
                </button>
                <div className="new_to_account">
                    <h4 >Already on Khaao?<Link to="/Login">Log in</Link></h4>
                </div>
                <p className='note'> <Link to="/privacy">Terms of use &amp; Conditioms</Link></p>
            </form>
        </div>
    );
}

export default Register;