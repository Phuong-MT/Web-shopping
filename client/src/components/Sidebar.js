import React from 'react';

const Sidebar = ({ options, onSelect }) => {
    return (
        <div className="w-64 bg-gray-100 h-full p-4 shadow-md">
            <ul>
                {options.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className="p-3 mb-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

