import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="admin-Dashboard" >Dashboard</Link>
          </li>
          <li>
            <Link to="Users">Users</Link>
          </li>
          <li>
            <Link to="view-orders">View Orders</Link>
          </li>
          <li>
            <Link to="view-reservations">View Reservations</Link>
          </li>
          <li>
            <Link to="view-menus">View Menus</Link>
          </li>
          <li>
            <Link to="add-menu-item">Add Menu Item</Link>
          </li>
          <li>
            <Link to="add-category">Add Category</Link>
          </li>
          <li>
            <Link to="register-admin">Register Admin</Link>
          </li>
          
        </ul>
      </nav>
  );
};

export default NavBar;


