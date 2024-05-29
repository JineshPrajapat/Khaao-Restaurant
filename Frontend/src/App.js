import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.scss';
import { useAuth } from './AuthProvider/AuthProvider';
import { useAdminAuth } from './AuthProvider/AdminAuthProvider';
import Header from './container/Header/Header';
import Home from './container/Home/Home';
import Footer from './container/Footer/Footer';
import Menu from './container/Menu/Menu';
import Cart from './container/Cart/Cart';
import Contact from './container/Contact/Contact';
import ReservationForm from './container/Reservations/ReservationForm/ReservationForm';
import Register from './container/Register/Register';
import Login from './container/Signin/Login';
import About from './container/About/About';
import Privacy from './container/Privacy/Privacy';
import Admin from './Admin/Admin';
import Services from './container/Services/Services';
import { Reservations } from './container/Reservations/Reservations';
import UnauthorizedAccess from './container/UnauthorizedAccess/UnauthorizedAccess';
import AdminSignUp from './Admin/AdminSignUp/AdminSignUp';

function App() {
  const { isLoggedIn } = useAuth();
  const { isAdminSignedUp } = useAdminAuth();

  const fullUrl = window.location.href;
  const isAdminSignUpUrl = fullUrl === 'http://localhost:3000/admin/';
  const isBaseUrl = fullUrl === 'https://khaao-restaurant.vercel.app/';
  // const isBaseUrl = fullUrl === 'http://localhost:3000/';


  if (isAdminSignUpUrl) {
    return (
      <div className='app'>
        {!isAdminSignedUp ?
          <AdminSignUp />
          :
          <Admin />
        }
      </div>
    );
  }


  if (isBaseUrl) {
    return (
      <div className='app'>
        <Header />
        <div className='md:mt-14 lg:mt-20'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Menu" element={<Menu />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="About" element={<About />} />
            <Route path="Privacy" element={<Privacy />} />
            <Route path="About" element={<About />} />
            <Route path="Services" element={<Services />} />
            <Route path="reservations" element={<Reservations />} />

            {isLoggedIn ?
              <>
                <Route path="bookingTable" element={<ReservationForm />} />
                <Route path="Cart" element={<Cart />} />
              </> :
              <>
                <Route path="Register" element={<Register />} />
                <Route path="Login" element={<Login />} />

                <Route path="bookingTable" element={<UnauthorizedAccess />} />
                <Route path="Admin/*" element={<UnauthorizedAccess />} />
                <Route path="Cart" element={<UnauthorizedAccess />} />
              </>
            }
          </Routes>
        </div>
        <Footer />

      </div>
    )
  }

}




export default App;
