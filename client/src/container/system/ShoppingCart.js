import React, { useState,useEffect } from 'react';
import {CartList, Summary} from '../../components/index';
import { apigetOrder, apiDeleteOrder } from '../../service';


const ShoppingCart = () => {
    const [cartData, setCartData] = useState([]);
    useEffect(() =>{
        const f = async function () {
            try {
                const response = await apigetOrder()
                const currentData = response?.data?.response
                setCartData(currentData)
            } catch (error) {
                console.log('error in get shoping-cart' + error)
            }
        }
        f();
    },[])

    const updateQuantity = (id, quantity) => {
        setCartData((prev) =>
            prev.map((order) => ({
                ...order,
                orderItem: order.orderItem.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                ),
            }))
        );
    };

    const removeItem = async(id) => {
        try {
            const response = await apiDeleteOrder(id)
            console.log(response)
        } catch (error) {
            
        }
        setCartData((prev) =>
            prev.map((order) => ({
                ...order,
                orderItem: order.orderItem.filter((item) => item.id !== id),
            }))
        );
    };

    const total = cartData.reduce(
        (acc, order) =>
            acc +
            order.orderItem.reduce((sum, item) => sum + item.price*item.quantity, 0),
        0
    );
    const handleCheckout = () => {
        alert('Checkout process!');
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn </h1>
        <CartList orders={cartData} onUpdate={updateQuantity} onRemove={removeItem} />
        <div className="mt-6">
            <Summary total={total} onCheckout={handleCheckout} />
        </div>
    </div>
    );
};

export default ShoppingCart;
