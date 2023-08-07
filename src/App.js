import React from 'react';
// import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import './App.scss';
import Header from './container/Header/Header';
import Home from './container/Home/Home';
import Footer from './container/Footer/Footer';
// import Dashboard from './container/Dashboard/Dashboard';
import Menu from './container/Menu/Menu';
import Cart from './container/Cart/Cart';
import Contact from './container/Contact/Contact';
import Reservation from './container/Reservation/Reservation';
import Register from './container/Register/Register';
import Login from './container/Signin/Login';
import About from './container/About/About';
import Privacy from './container/Privacy/Privacy';
import Admin from './Admin/Admin';
import Services from './container/Services/Services';

function App() {
  return (
    <div className='app'>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Menu" element={<Menu />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="Reservation" element={<Reservation />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        <Route path="About" element={<About/>}/>
        <Route path="Cart" element={<Cart/>}/>
        <Route path="Privacy" element={<Privacy/>}/>
        <Route path="About" element={<About/>}/>
        <Route path="Services" element={<Services/>}/>
        <Route path="Admin/*" element={<Admin/>}/>
      </Routes>
      <Footer />
      {/* <button onclick="topFunction()" id="upBtn" class="btn"><i class="fa fa-arrow-circle-up"></i></button> */}
    </div>
  )
}




export default App;
