import React, { memo } from 'react'

const InputFormV2 = ({ label, value, onChange, type = "text", placeholder = "Thêm thông tin vào đây"}) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={placeholder}
            />
        </div>
    );
};

export default memo(InputFormV2);
