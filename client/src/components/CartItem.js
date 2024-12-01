import React from 'react';

const CartItem = ({ item, onUpdate, onRemove }) => {
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) {
            onUpdate(item.id, newQuantity);
        }
    };
    return (
        <div className="flex justify-between items-center border-b py-4">
            <div className="flex items-center space-x-4">
                <img src={item.imageUrl} alt={item.productId} className="w-16 h-16 object-cover" />
                <div>
                    <h3 className="text-lg font-semibold">Product ID: {item.productId}</h3>
                    <p className="text-sm text-gray-500">Size: {item.Size}</p>
                    <p className="text-sm text-gray-500">Price: {item.price} VND</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    className="w-16 border p-1 text-center"
                />
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:underline"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
