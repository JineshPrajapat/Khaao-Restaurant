import React, { useState } from 'react';
import { useAdminAuth } from '../../AuthProvider/AdminAuthProvider';
import images from '../../constants/images';
import { baseURL } from '../../config/api';
import axios from 'axios';
import PreLoader from '../../container/PreLoader/PreLoader';

const AdminSignUp = () => {
    const {setAdminIsSignedUp} = useAdminAuth();

    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [formValue, setformValue] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (formValue.email === '' || formValue.password === '') {
            setError('Both username and password are required');
            return;
        }

        setProcessing(true);

        axios.post(`${baseURL}/admin/adminLogin`,{
            email:formValue.email,
            password : formValue.password
        })
        .then(response =>{
            console.log("Response", response);

            if(response.status === 200)
                {
                    const token = response.data.token;
                    const userName = response.data.admin.name;
                    const email = response.data.admin.email;
                    const role = "Admin";
                    localStorage.setItem('token', token);
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('email', email);
                    localStorage.setItem('Role', role);

                    setAdminIsSignedUp(true);
                }
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 404) {
                    // Handle user not found
                    console.error('User not found');
                    alert('Not Authorized!');
                    // setFlashMessage({ type: 'error', message: 'User not found' });

                } else if (error.response.status === 401) {
                    // Handle authentication failure
                    console.error('Authentication failed');
                    alert("Authentication failed")
                    // setFlashMessage({ type: 'error', message: 'Authentication failed' });
                    // window.location.href = `http://admin.localhost:3000/`;

                } else {
                    // Handle other errors
                    console.error('Error:', error.response);
                    alert('Server Error, Try again later!');
                }
            } else {
                // Handle network or request errors
                console.error('Network or request error:', error);
            }
        })
        .finally(()=>{
            setProcessing(false);
            setformValue({
                email:"",
                password:""
            });
        })

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <img src={images.logo} alt="Khaao Restaurant Logo" className="w-20 h-20 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold">Welcome to Admin Portal</h1>
                    <p className="text-gray-600">Khaao Restaurant</p>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formValue.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={formValue.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className={` w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${processing ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"}`}
                        >
                            {processing ? <PreLoader/> : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSignUp;
