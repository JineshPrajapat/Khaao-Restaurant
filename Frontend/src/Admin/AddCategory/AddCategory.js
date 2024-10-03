import React, { useEffect, useState } from "react";
import axios from "axios";
import './AddCategory.scss';
import FlashMessage from "../../container/FlashMessage/FlashMessage";
import ConfirmationDialog from "../../container/ConfirmationDialog/ConfirmationDialog";
import { baseURL } from "../../config/api";
import { fetchData } from "../../FetchData/fetchData";

//  below line can create upto 28 error of webpack with 4 warning, only single line
// import { response } from "express";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);

  // handling form submission using useState
  const [formValue, setformValue] = useState({
    category: '',
    categoryImage: null
  });

  useEffect(() => {
    fetchData(`${baseURL}/category`, setCategoryData)
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

  // handling form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Create a FormData object to send both form data and image
    const formData = new FormData();
    formData.append('category', formValue.category);
    formData.append('categoryImage', formValue.categoryImage);
    console.log(formData);
    setShowConfirmation(true);
    // console.log('image:', imageData);
  };

  // handling form submission after confirmation
  const handleConfirmation = async (isConfirmed) => {
    if (isConfirmed) {

      const formData = new FormData();
      if (!formValue.category || !formValue.categoryImage) {
        console.error('Form value properties are missing:', formValue);
        setFlashMessage({ type: 'error', message: 'Missing category or category image' });
        setShowConfirmation(false);
        return;
      }

      formData.append('category', formValue.category);
      formData.append('categoryImage', formValue.categoryImage);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const token = localStorage.getItem('token');

      await axios.post(`${baseURL}/admin/addcategory`, formData, {
        headers: {
          Authorization: `Bearer ${token}`            // Include token in Authorization header
        }
      })
        .then(response => {
          console.log("Response:", response);

          if (response.status === 200) {
            setFlashMessage({ type: 'success', message: `${formValue.name} is added to the category successfully.` });
            // window.location.href = 'http://localhost:3001/Admin/addMenu';
          }
        })
        .catch(error => {
          if (error.response) {
            console.error('Error:', error);
            setFlashMessage({ type: 'error', message: 'Item not added, try again!' });
            // window.location.href = 'http://localhost:3001/Admin/addMenu';
          } else {
            console.error('Network or request error');
            // window.location.href = 'http://localhost:3001/Admin/addMenu';
          }
        })
        .finally(() => {
          // Reset form values to null after form submission (success or failure)
          setformValue({
            category: '',
            categoryImage: null
          })
        })
    }
    setShowConfirmation(false);
  };

  // handling delete category
  const handleDeleteCategory = async (categoryIds) => {
    setCategoryId(categoryIds);
    setShowConfirmationDelete(true);
  }
  // handling delete after confirmation
  const handleConfirmDelete = async (isConfirmed) => {
    if (isConfirmed) {
      try {
        console.log("categoryid", categoryId);
        const token = localStorage.getItem('token');
        await axios.delete(`${baseURL}/admin/deleteCategory/${categoryId}`,{
          headers: {
            Authorization: `Bearer ${token}`            // Include token in Authorization header
          }
        })
          .then(response => {
            if (response.status === 200) {
              console.log("Category Deletion succesful.");
              setFlashMessage({ type: 'sucess', message: 'Category Deletion succesful.' })
            }
          })
          .catch(error => {
            if (error.response.status === 404) {
              console.error('Error:', error);
              setFlashMessage({ type: 'error', message: `Category is deleted already` })
            } else {
              console.error('Network or request error')
              setFlashMessage({ type: 'error', message: ` Not deleted, try again!` })
            }
          })

        setCategoryData((prevCategory) => prevCategory.filter((item) => item.category_id !== categoryId));
        setShowConfirmationDelete(false)
      }
      catch (err) {
        console.error(err.message);
      }
    }
    setShowConfirmationDelete(false);
  }

  return (
    <div className={`add-category ${showConfirmation || showConfirmationDelete ? 'show-confirmation' : ''}`}>
      <h2>Add Category</h2>
      <form onSubmit={handleFormSubmit} >
        <div className="category-input">
          <label htmlFor="category">Category:
            <input
              type="text"
              placeholder="Add Your Category"
              id="category"
              name="category"
              value={formValue.category}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="image">Image:
            <input
              type="file"
              id="categoryImage"
              name="categoryImage"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Category</button>
      </form>

      {showConfirmation && (
        <ConfirmationDialog
          message={'Are you sure you want to add this category?'}
          onConfirm={handleConfirmation}
        />
      )}

      <div className="show-category">
        <h2>Categories</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sr. no</th>
                <th>Category</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categoryData?.map((category, index) => (
                <tr
                  key={category?.categoryid}
                >
                  <td>{category?.category_id}</td>
                  <td>{category?.variety}</td>
                  <td className="flex items-center justify-center"><img src={category?.imageurl} alt={category?.variety} /></td>
                  <td>
                    <button onClick={() => handleDeleteCategory(category?.category_id)}>Delete</button>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* delete confirmation component */}
      {showConfirmationDelete && (
        <ConfirmationDialog
          message={'Are you sure you want to delete this category?'}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* flash component */}
      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}
    </div>


  );
};

export default AddCategory;
