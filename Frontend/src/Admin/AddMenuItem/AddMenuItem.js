import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../container/ConfirmationDialog/ConfirmationDialog';
import FlashMessage from '../../container/FlashMessage/FlashMessage';
import './AddMenuItem.scss';
import { appURL, baseURL } from "../../config/api";
import { fetchData } from '../../FetchData/fetchData';

const AddMenuItem = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);
  const [imageData, setImageData] = useState(null);

  // fetching categories for selecting option
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/category`);
      const jsonData = response.data;
      setCategories(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  })

  // handling form submission using useState
  const [formValue, setformValue] = useState({
    name: '',
    category: '',
    amount: '',
    image: null
  })

  const handleChange = (event) => {
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


  //handling form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Create a FormData object to send both form data and image
    const formData = new FormData();
    formData.append('name', formValue.name);
    formData.append('category', formValue.category);
    formData.append('amount', formValue.amount);
    formData.append('image', formValue.image);

    setShowConfirmation(true);
    // console.log('image:', imageData);
  }

  //handling form submit after cofirmation
  const handleConfirmation = async (isConfirmed) => {
    if (isConfirmed) {

      const formData = new FormData();
      formData.append('name', formValue.name);
      formData.append('category', formValue.category);
      formData.append('amount', formValue.amount);
      formData.append('image', formValue.image);

      const token = localStorage.getItem('token');

      await axios.post(`${baseURL}/admin/addMenu`, formData, {
        headers: {
          Authorization: `Bearer ${token}`            // Include token in Authorization header
        }
      })
        .then(response => {
          console.log("Response:", response);

          if (response.status === 200) {
            setFlashMessage({ type: 'success', message: `${formValue.name} is added to the menu successfully.` });
            // window.location.href = 'http://localhost:3001/Admin/add-menu-item';
          }
        })
        .catch(error => {
          if (error.response) {
            console.error('Error:', error);
            setFlashMessage({ type: 'error', message: 'Item not added, try again!' });
            window.location.href = `${appURL}/Admin/add-menu-item`;
          } else {
            console.error('Network or request error');
            window.location.href = `${appURL}/Admin/add-menu-item`;
          }
        })
    }
    setShowConfirmation(false);
  }

  return (
    <div className={`add-menu-item ${showConfirmation ? 'show-confirmattion' : ''}`}>
      <h2>Add Menu Item</h2>
      <form id='add-menu-from' encType="multipart/form-data" onSubmit={handleFormSubmit}>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name='name'
          value={formValue.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formValue.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a Category</option>
          {!isLoading && categories?.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.variety}
            </option>
          ))}
        </select>

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name='amount'
          value={formValue.amount}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name='image'
          accept='image/*'
          onChange={handleFileChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {showConfirmation && (
        <ConfirmationDialog
          message={`Are you sure you want to add to menu item?`}
          onConfirm={handleConfirmation}
        />
      )}

      {/* flash component */}
      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

    </div>
  );
};

export default AddMenuItem;

