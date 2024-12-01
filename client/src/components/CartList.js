import React from 'react';
import CartItem from './CartItem';

const CartList = ({ orders, onUpdate, onRemove }) => {

    return (
        <div>
            {orders.map((order, orderIndex) => (

                <div key={orderIndex} className="mb-6">
                    <h2 className="text-lg font-bold mb-4">Order Status: {order.status}</h2>
                    {order.orderItem.map((item, itemIndex) => (
                        <CartItem
                            key={`${orderIndex}-${itemIndex}`}
                            item={item}
                            onUpdate={onUpdate}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CartList;
