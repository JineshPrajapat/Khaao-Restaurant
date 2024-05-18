import React, { useState } from 'react';
import axios from 'axios';
import FlashMessage from '../../container/FlashMessage/FlashMessage';
import { appURL, baseURL } from '../../config/api';
import './RegisterAdmin.scss';

const RegisterAdmin = () => {
  const [flashMessage, setFlashMessage] = useState(false);

  const [formValue, setformValue] = useState({
    name:'',
    phoneNumber:"",
    email:"",
    address:"",
    password:"",
    adminImage:null
  })

  const handleChange = (event) =>{
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setformValue({
      ...formValue,
      [name]: files[0], name,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', formValue.name);
      formData.append('phoneNumber', formValue.phoneNumber);
      formData.append('email', formValue.email);
      formData.append('address', formValue.address);
      formData.append('password', formValue.password);
      formData.append('adminImage', formValue.adminImage);

      await axios.post(`${baseURL}/admin/adminRegister`, formData)
        .then(response => {
          console.log("Response:", response);

          if (response.status === 200) {
            setFlashMessage({ type: 'success', message: `${formValue.name} is now admin.` });
          }
        })
        .catch(error => {
          if (error.response) {
            console.error('Error:', error);
            setFlashMessage({ type: 'error', message: 'Not registerd, try again!' });
            window.location.href = `${appURL}/Admin/register-admin`;
          } else {
            console.error('Network or request error');
            window.location.href = `${appURL}/Admin/register-admin`;
          }
        })
        .finally(() => {
          // Reset form values to null after form submission (success or failure)
          setformValue({
            name: '',
            phoneNumber: '',
            email: '',
            address: '',
            password: '',
            adminImage: null
          })
        })
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="register-admin">
      <h2>Register Admin</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name='name'
          value={formValue.name}
          onChange={handleChange}
          required />
        <label htmlFor="email">Phone number:</label>
        <input 
          type="tel" 
          id="phoneNumber" 
          name='phoneNumber'
          value={formValue.phoneNumber}
          onChange={handleChange}
          required />

        <label htmlFor="email">Email address:</label>
        <input 
          type="email" 
          id="email" 
          name='email'
          value={formValue.email}
          onChange={handleChange}
          required />

        <label htmlFor="address">Address:</label>
        <input 
          type="text" 
          id="address" 
          name='address'
          value={formValue.address}
          onChange={handleChange}
          required />

        <label htmlFor="image">Image:</label>
        <input 
          type="file" 
          id="adminImage" 
          name='adminImage' 
          accept='image/*'
          onChange={handleFileChange}
          required />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name='password'
          value={formValue.password}
          onChange={handleChange}
          required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;

