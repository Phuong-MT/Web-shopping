import React, { useState,useEffect } from 'react';
import {CartList, Summary} from '../../components/index';
import { apigetOrder } from '../../service';

const ShoppingCart = () => {

    useEffect(() =>{
        const f = async function () {
            try {
                const response = await apigetOrder()
                const currentData = response?.data?.response
                console.log(currentData)
            } catch (error) {
                console.log('error in get shoping-cart' + error)
            }
        }
        f();
    },[])
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', price: 50, quantity: 1, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 30, quantity: 2, image: 'https://via.placeholder.com/150' },
    ]);

    const updateQuantity = (id, quantity) => {
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = () => {
        alert('Checkout process!');
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Giỏ Hàng</h1>
            <CartList items={cartItems} onUpdate={updateQuantity} onRemove={removeItem} />
            <div className="mt-6">
                <Summary total={total} onCheckout={handleCheckout} />
            </div>
        </div>
    );
};

export default ShoppingCart;
