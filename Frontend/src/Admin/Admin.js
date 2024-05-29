import React, { useState, useEffect } from 'react';
import './Admin.scss';
import { checkAndClearExpiredData } from '../utils/storage';
import images from '../constants/images';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Dashboard from './Dashboard/Dashboard';
import ViewMenus from './ViewMenu.js/ViewMenu';
import AddMenuItem from './AddMenuItem/AddMenuItem';
import ViewOrders from './ViewOrder/ViewOrder';
import ViewReservation from './ViewReservation/ViewReservation';
import RegisterAdmin from './RegisterAdmin/RegisterAdmin';
import AddCategory from './AddCategory/AddCategory';
import Users from './Users/Users';

const Admin = () => {
  // function navbarToggle() {
  //   var x = document.getElementById("admin-navbar");
  //   if (x.className === "admin_navbar_main") {
  //     x.className += " responsive";
  //   } else {
  //     x.className = "admin_navbar_main";
  //   }
  // }

  const [navbarToggle, setNavbarToggle] = useState(false);

  useEffect(() => {
    checkAndClearExpiredData();
  }, []);

  const handleNavbarToggle = () => {
    setNavbarToggle(!navbarToggle);
  }
  function profileDropdown() {
    var x = document.getElementById("navbarDropdown");
    if (x.className === "dropdown-profile") {
      x.className += " drop";
    } else {
      x.className = "dropdown-profile";
    }
  }

  const handleLogout = () => {
    localStorage.clear();

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.href = "/";
  };

  return (
    <div className='admin'>
      <div className='admin_header'>
        <div className='icon' onClick={handleNavbarToggle} ><i className='fa fa-bars' /></div>
        <h1 className='admin-heading'>Restaurant Administration</h1>
        <div className='admin_dropdown_end'>
          <a className="dropdown_title" href="javascript:void(0)" onClick={profileDropdown}>
            Super Admin <i class="fa-solid fa-caret-down" style={{ color: '#f6f7f9' }}></i>
          </a>
          <div className="dropdown-profile" id="navbarDropdown" >
            <a className="dropdown-item" href="#transaction">Transactions History</a>
            <a className="dropdown-item" href="#setting">Settings</a>
            <a className="dropdown-item" href="#logout" onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </div>
      <div className='admin_navbar_main' id='admin-navbar'>
        <div className={` ${navbarToggle ? "block" : "hidden md:block"}`}>
          <NavBar />
        </div>
        <div className="admin_main_content">
          <Routes >
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-Dashboard" element={<Dashboard />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/view-menus" element={<ViewMenus />} />
            <Route path="/add-menu-item" element={<AddMenuItem />} />
            <Route path="/view-orders" element={<ViewOrders />} />
            <Route path="/view-reservations" element={<ViewReservation />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />
            <Route path="/add-category" element={<AddCategory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
