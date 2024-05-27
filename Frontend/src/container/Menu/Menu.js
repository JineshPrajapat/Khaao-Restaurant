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
                        {categoryList?.map((item, index) => (
                            <h4 key={item?.category_id + index} onClick={() => onCategoryClick(item?.variety)} >{item?.variety}</h4>
                        ))}
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
                        ))
                    )}
                </div>
            </div>
            {/* <Cart cartItems={CartItems} /> */}

        </>
    )
}


export default Menu;
