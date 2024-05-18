import React, { useState } from "react";
import { images } from '../../constants';
import './Cart.scss';

const CartItems = [
    {
        imgUrl: images.burger,
        title: 'Burgers',
        description: 'Our juicy burgers are made with 100% pure beef and served on a toasted bun.',
        amount: 100
    },
    {
        imgUrl: images.pizza,
        title: 'Pizza',
        description: 'Our delicious pizza is made with fresh, high-quality ingredients and cooked to perfection.',
        amount: 120
    },
    {
        imgUrl: images.coffee,
        title: 'Coffee',
        description: 'Our crisp salads are made with fresh, locally-sourced produce and dressed with your choice of dressing.',
        amount: 50
    },
    {
        imgUrl: images.aloop,
        title: 'Aloo Paratha',
        description: 'Our juicy Aloo paratha are made with 100% pure beef and served on a toasted bun.',
        amount: 30
    }
]

function Cart(decreaseQuantity, increaseQuantity, removeFromCart) {

    const [cartItems, setCartItems] = useState(CartItems);
    if (!cartItems || cartItems.length === 0) {
        return <div className="cart">Cart is empty</div>;
    }

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.amount, 0);
    };

    const getItemCount = () => {
        return cartItems.length;
    };

    return (
        <div className="cart">
            <h2>Cart</h2>
            {cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                    <img src={item.imgUrl} alt={item.title} />
                    <div className="cart-item-details">
                        <h3>{item.title}</h3>
                        <span>₹{item.amount}</span>
                    </div>
                    <div className="quantity-controls">
                        <button onClick={() => decreaseQuantity(item)}><i className="fa fa-minus" aria-hidden="true" /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item)}><i className="fa fa-plus" aria-hidden="true" /></button>
                    </div>
                    <button className="remove-item" onClick={() => removeFromCart(item)}><i className="fa fa-trash" aria-hidden="true" /></button>

                </div>
            ))}
            <div className="cart-summary">
                <p>Total Items: {getItemCount()}</p>
                <p>Total Amount: ₹{getTotalAmount()}</p>
                <button>Order Now</button>
            </div>
        </div>
    );
}

export default Cart;