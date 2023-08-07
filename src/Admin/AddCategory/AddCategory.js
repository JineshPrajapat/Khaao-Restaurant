import React, { useEffect, useState } from "react";
import axios from "axios";
import './AddCategory.scss';
import FlashMessage from "../../container/FlashMessage/FlashMessage";
import ConfirmationDialog from "../../container/ConfirmationDialog/ConfirmationDialog";
import { response } from "express";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);

  // handling form submission using useState
  const [formValue, setformValue] = useState({
    category: '',
  })

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  // fetching data from server
  const getCategory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Admin/Admin/add-category');
      const jsonData = await response.data;
      setCategoryData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  // handling image reader file
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

  // handling form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Create a FormData object to send both form data and image
    const formData = new FormData();
    formData.append('category', formValue.category);
    formData.append('image', imageData);
    setShowConfirmation(true);
    console.log('image:', imageData);
  };

  // handling form submission after confirmation
  const handleConfirmation = async (isConfirmed) => {
    if (isConfirmed) {
      // convert to binary data
      const imageBlob = await fetch(imageData).then((res) => res.blob());                  // Blob object to handle binary data

      const formData = new FormData();
      formData.append('category', formValue.category);
      formData.append('image', imageBlob);

      await axios.post("http://localhost:3000/addcategory", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
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
        await axios.delete(`http://localhost:3000/Admin/Admin/delete-category/:${categoryId}`)
        .then(response=>{
          if(response.status === 200){
            console.log("Category Deletion succesful.");
            setFlashMessage({type:'sucess', message:'Category Deletion succesful.'})
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

        setCategoryId((prevCategory) => prevCategory.filter((item) => item.categoryid !== categoryId));
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
      <form action="http://localhost:3000/addcategory" method="post" id="category-form" encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <div className="category-input">
          <label htmlFor="category">Category:
            <input
              type="text"
              placeholder="Add Your Category"
              id="category"
              name="category"
              value={formValue.amount}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="image">Image:
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
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
                <th>Category ID</th>
                <th>Category</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((category, index) => (
                <tr
                  key={category.categoryid}
                >
                  <td>{category.category_id}</td>
                  <td>{category.variety}</td>
                  <td><img src={category.image} alt={category.variety} /></td>
                  <td>
                    <button onClick={() => handleDeleteCategory(category.categoryid)}>Delete</button>
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
