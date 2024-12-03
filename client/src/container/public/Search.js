import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import để chuyển hướng
import { CiCirclePlus } from "react-icons/ci";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [query, setQuery] = useState({
    category: "",
    // price: "",
    // size: "",
    color: "",
    gender:"",
    // upgrade: "",
  });

  const navigate = useNavigate();

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleOptionSelect = (dropdown, value) => {
    setQuery((prev) => ({
      ...prev,
      [dropdown]: value,
    }));
    setActiveDropdown(null);
  };

  const isQueryEmpty = (query) => {
    return Object.values(query).every((value) => !value); // Kiểm tra tất cả giá trị
  };
  
  const handleSearch = () => {
      if(!isQueryEmpty(query)){
        const queryParams = new URLSearchParams(query).toString(); // Chuyển object thành query string
        navigate(`/tim-kiem/?${queryParams}`);

        setQuery({
          category: "",
          color: "",
          gender:"",
        });
      }
  };

  const options = {
    category: ["Áo", "Quần", "Váy","Đầm"],
    // price: ["Dưới 100k", "100k - 200k", "200k - 500k", "Trên 500k"],
    // size: ["S", "M", "L", "XL"],
    color: ["Đỏ", "Xanh", "Vàng", "Trắng"],
    gender:["Nam","Nữ","orther"]
    // upgrade: ["Standard", "Premium", "Luxury"],
  };

  return (
    <div className="relative flex flex-wrap bg-yellow-400 p-2 rounded-lg space-x-2">
      {Object.keys(options).map((key) => (
        <div className="relative" key={key}>
          <button
            className="flex items-center bg-white text-black px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100"
            onClick={() => toggleDropdown(key)}
          >
            {query[key]
              ? `${key.charAt(0).toUpperCase() + key.slice(1)}: ${query[key]}`
              : key.charAt(0).toUpperCase() + key.slice(1)}
            <IoChevronForwardCircleOutline className="ml-2 text-lg" />
          </button>

          {activeDropdown === key && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-lg w-40">
              {options[key].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleOptionSelect(key, item)}
                >
                  {item}
                  <CiCirclePlus className="text-gray-500 text-lg" />
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Search Button */}
      <button
        className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-blue-600"
        onClick={handleSearch}
      >
        <FiSearch className="mr-2 text-lg" />
        Tìm kiếm
      </button>
    </div>
  );
};

export default Search;
