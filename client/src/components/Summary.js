import React from 'react';

const Summary = ({ total, onCheckout }) => {
    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <p className="text-sm text-gray-500">Total: {total.toFixed(2)} VND</p>
            <button
                onClick={onCheckout}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
                Checkout
            </button>
        </div>
    );
};

export default Summary;
