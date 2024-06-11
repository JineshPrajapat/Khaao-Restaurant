
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

const NavBar = () => {

    const Menus = [
        { name: "DashBoard", icon: "fas fa-tachometer-alt", path: "/admin/" },
        { name: "Users", icon: "fas fa-users", path: "/admin/Users" },
        { name: "Menu", icon: "fas fa-utensils", path: "/admin/view-menus" },
        // { name: "Orders", icon: "fas fa-shopping-cart", path: "/view-orders" },
        { name: "Reservation", icon: "fas fa-calendar-check", path: "/admin/view-reservations" },
        { name: "Add Menu", icon: "fas fa-plus-square", path: "/admin/add-menu-item" },
        { name: "Add Category", icon: "fas fa-tags", path: "/admin/add-category" },
        { name: "Add Admin", icon: "fas fa-user-plus", path: "/admin/register-admin" },
    ]
    const [active, setActive] = useState(0);

    const handleClick = (index) => {
        setActive(index);
    }


    return (
        <div className=''>
            <div className={`sidebar py-6 h-[93vh]  bg-[#333] rounded-r-xl`}>
                <ul className='sidebar-links px-6 flex flex-col gap-3 relative'>
                    {Menus.map((menu, i) => (
                        <li className='links' >
                            <NavLink
                                className={`flex gap-3 py-2 px-2 rounded-3xl duration-500 no-underline text-white ${i === active && "bg-white"}`}
                                to={menu.path}
                                activeClassName="text-blue"
                                onClick={() => handleClick(i)}
                            >
                                <span className={`icon text-[14px] duration-500 flex items-center  ${i === active && "text-black "}`}>
                                    <i class={menu.icon}></i>
                                </span>
                                <span className={`links-name text-[14px] font-semibold font-sans duration-500 whitespace-nowrap
                                                     ${i === active && "text-black duration-700"}`}
                                >
                                    {menu.name}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default NavBar;