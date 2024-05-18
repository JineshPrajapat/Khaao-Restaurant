import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { AuthProvider } from './AuthProvider/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter >
  </AuthProvider>

);


// import Menu from './container/Menu/Menu';
// import Contact from './container/Contact/Contact';
// import Login from './container/Login/Login';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App/>}/>
//         <Route path="Menu" element={<Menu/>}/>
//         <Route path="Contact" element={<Contact/>}/>
//         <Route path="Login" element={<Login/>}/>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );
