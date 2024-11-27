import React from 'react';
import CartItem from './CartItem';

const CartList = ({ items, onUpdate, onRemove }) => {
    return (
        <div>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default CartList;
