import React, { memo } from 'react'

const InputText = ({ label, value, onChange, type = "text", placeholder = "Thêm thông tin vào đây", rows = '3'}) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{label}</label>
            <textarea
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                rows = {rows}
                placeholder={placeholder}
                required
                />
        </div>
    );
};

export default memo(InputText);
