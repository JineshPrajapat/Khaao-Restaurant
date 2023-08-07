import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationDialog from '../../container/ConfirmationDialog/ConfirmationDialog';
import FlashMessage from '../../container/FlashMessage/FlashMessage';
import './ViewMenu.scss';

const ViewMenus = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuId, setMenuId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);


  // fetching data from server
  const getMenus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Admin/view-menus");
      const jsonData = await response.data;
      setMenuItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  // handle confirmatioDialog
  const handleDelete = async (menuIDs) => {
    setMenuId(menuIDs);
    setShowConfirmation(true);
  }

  // handle after confirmation
  const handleConfirmDelete = async (isConfirmed) => {
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/Admin/Admin/delete-menu/${menuId}`)
          .then(response => {
            if (response.status === 200) {
              console.log(`Deletion successfully!`);
              setFlashMessage({ type: 'success', message: `Deletion successful.` });
            }
          })
          .catch(error => {
            if (error.response.status === 404) {
              console.error('Error:', error);
              setFlashMessage({ type: 'error', message: `Item is deleted already` })
            } else {
              console.error('Network or request error')
              setFlashMessage({ type: 'error', message: ` Not deleted, try again!` })
            }
          })
          
        setMenuItems((prevMenuItem) => prevMenuItem.filter((item) => item.menuid !== menuId));
        setShowConfirmation(false);
      }
      catch (err) {
        console.error(err.message);
      }
    }
    setShowConfirmation(false);
  };

  return (
    <div className={`view-menus ${showConfirmation ? 'show-confirmation' : ''}`}>
      <h2>View Menus</h2>
      <div className="menu-list">
        {menuItems.map((item, index) => (
          <div className="menu-item" key={item.menuid}>
            {/* Display the image directly using Base64 encoded data */}
            <img src={item.image} alt={item.name} />
            <div className="details">
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
              {/* <p>{item.description}</p> */}
            </div>
            <button onClick={() => handleDelete(item.menuid)}>Delete</button>
          </div>
        ))}
      </div>

      {showConfirmation && (
        <ConfirmationDialog
          message={'Are you sure you want to delete this menu item?'}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* flash component */}
      {flashMessage &&
        <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

    </div>
  );
};

export default ViewMenus;
