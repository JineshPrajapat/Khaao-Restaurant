import React from 'react';
import './Dashboard.scss';
const totalUser = 300;
const totalMenu = 47;
const totalCategory = 11;
const totalOrders = 500; // Replace with actual total orders count
const currentDayOrders = 25; // Replace with actual current day orders count
const todaysReservations = 10; // Replace with actual today's reservations count
const totalRevenue = 2500; // Replace with actual total revenue amount
const avgOrderValue = totalRevenue / totalOrders; // Calculate average order value
const busiestDay = 'Saturday'; // Replace with the actual busiest day of the week

const Dashboard = () => {
  return (
    <div className="home">
      
      <div className="analytics fade-in">
        <div className="info-card slide-left">
          <h3>Total Users</h3>
          <p>{totalUser}</p>
        </div>
        <div className="info-card slide-right">
          <h3>Total Menu</h3>
          <p>{totalMenu}</p>
        </div>
        <div className="info-card zoom-in">
          <h3>Category</h3>
          <p>{totalCategory}</p>
        </div>
        <div className="info-card slide-left">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="info-card slide-right">
          <h3>Current Day Orders</h3>
          <p>{currentDayOrders}</p>
        </div>
        <div className="info-card zoom-in">
          <h3>Today's Reservations</h3>
          <p>{todaysReservations}</p>
        </div>
        <div className="info-card slide-left">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>
        <div className="info-card slide-right">
          <h3>Average Order Value</h3>
          <p>₹{avgOrderValue.toFixed(2)}</p>
        </div>
        <div className="info-card zoom-in">
          <h3>Busiest Day</h3>
          <p>{busiestDay}</p>
        </div>
      </div>

      <div className="additional-info fade-in">
        <h2>Welcome to the Admin Panel</h2>
        <p>
          This is the admin panel of the restaurant website. Here, you can manage menus, view
          orders, handle reservations, and perform various administrative tasks to ensure smooth
          restaurant operations.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
