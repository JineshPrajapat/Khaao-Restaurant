import React, { useState } from 'react';
import './RegisterAdmin.scss';

const RegisterAdmin = () => {
  const [imageData, setImageData] = useState('');

  // handle image on change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // submitting form
  const handleFormSubmit = (event) => {
    event.preventDefault();
    try {
      const form = document.getElementById('register-from');
      form.submit();
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="register-admin">
      <h2>Register Admin</h2>
      <form action='http://localhost:3000/adminRegister' method='post' encType="multipart/form-data" id='register-from' onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name='name'
          required />
        <label htmlFor="email">Phone number:</label>
        <input type="tel" id="phone_number" name='phone_number'
          required />

        <label htmlFor="email">Email address:</label>
        <input type="email" id="email" name='email'
          required />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name='address'
          required />

        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name='image' accept='image/*'
          onChange={handleImageChange}
          required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name='password'
          required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;

