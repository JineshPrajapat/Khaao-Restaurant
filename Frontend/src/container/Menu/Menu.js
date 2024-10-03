import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import './Menu.scss';
import { baseURL } from "../../config/api";

function Menu() {
    const [menuData, setMenuData] = useState({
        menulist: [],
        loading: true,
    })
    // const [menulist, setMenuList] = useState([]);
    const [categoryList, setcategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Breakfast");

    // fetching category from server
    const getCategory = async () => {
        try {
            const response = await fetch(`${baseURL}/menu`);
            const jsonData = await response.json();
            setcategoryList(jsonData);
            setMenuData((prevData) => ({ ...prevData, loading: false }));
        } catch (err) {
            console.error(err.message);
            setMenuData((prevData) => ({ ...prevData, loading: false }));
        }
    }

    //Fetch menu items for Breakfast category
    const getBreakfastMenu = async () => {
        try {
            const response = await fetch(`${baseURL}/menu/Breakfast`);
            const jsonData = await response.json();
            setMenuData({ menulist: jsonData, loading: false });
        } catch (err) {
            console.error(err.message);
            setMenuData({ menulist: [], loading: false });
        }
    };

    useEffect(() => {
        getCategory();
        getBreakfastMenu();
    }, [])


    // handling on Categoryclick
    const onCategoryClick = async (selectedVariety) => {
        setSelectedCategory(selectedVariety);
        console.log("Selected Variety:", selectedVariety);
        try {
            const response = await fetch(`${baseURL}/menu/${selectedVariety}`);
            const jsonData = await response.json();
            setMenuData({ menulist: jsonData, loading: false });
        } catch (err) {
            console.log(err.message);
            setMenuData({ menulist: [], loading: false });
        }

    }


    const [CartItems, setCartItems] = useState([]);

    const handleAddToCart = (item) => {
        const newItem = {
            imgUrl: item.image,
            title: item.name,
            description: item.description, // Add a description if available
            amount: item.price,
            quantity: 1 // Set initial quantity to 1
        };
        setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    };

    return (
        <>
            <div class="menu">
                <h2>MENU</h2>
                <div className="category-container">
                    <div className="category-name">
                        {categoryList?.map((item, index) => {
                            return (
                                // <h4
                                //     key={item?.category_id + index}
                                //     onClick={() => onCategoryClick(item?.variety)}
                                // >
                                //     {item?.variety}
                                // </h4>

                                <h4
                                    key={item?.category_id + index}
                                    onClick={() => onCategoryClick(item?.variety)}
                                    className={`font-bold py-2 px-3 whitespace-nowrap border-t-2 border-b-2 border-white uppercase text-white cursor-pointer transition-colors duration-400 hover:bg-[#550c3e] hover:text-wheat active:bg-[#550c3e] active:text-wheat relative ${selectedCategory === item?.variety ? "bg-[#550c3e] text-wheat" : ""}`}
                                >
                                    {item?.variety}
                                    {/* <span className="absolute left-0 top-0 h-full w-0 bg-[#550c3e] transition-all duration-300 group-hover:w-full"></span> */}
                                </h4>

                            )
                        })}
                    </div>
                </div>

                <div className="menu-item">
                    {menuData.loading ? (<p>Loading...</p>    // checling if data still loading
                    ) : menuData.menulist.length === 0 ? (<p>No items available for this category.</p>) : (
                        menuData.menulist.map((item, index) => (
                            <div className="menu-item__profile" key={item.menuid + index}>
                                <img src={item.imageurl} alt={item.title} />
                                <h3>{item.name}</h3>
                                <span>₹{item.price}</span>
                                <button className="add-cart" onClick={() => handleAddToCart(item)}>
                                    Add to cart
                                </button>
                            </div>
                            
                            // <div
                            //     className="flex flex-col w-36 h-full rounded-t-full items-center p-1 bg-[wheat] shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                            //     key={item.menuid + index}
                            // >
                            //     <img
                            //         src={item.imageurl}
                            //         alt={item.title}
                            //         className="w-full h-28 rounded-full object-cover  mb-4 transition-transform duration-500 ease-in-out transform hover:scale-105"
                            //     />
                            //     <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                            //     <span className="text-xl text-gray-600 mb-4">₹{item.price}</span>
                            //     <button
                            //         className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 active:bg-green-700 transition-colors duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                            //         onClick={() => handleAddToCart(item)}
                            //     >
                            //         Add to cart
                            //     </button>
                            // </div>

                        ))
                    )}
                </div>
            </div>
            {/* <Cart cartItems={CartItems} /> */}

        </>
    )
}


export default Menu;
