import React, { memo, useState } from "react";
import icons from "../ultils/icons";

const Sort = ({query, setQuery}) => {
    const {FaTshirt, FaPalette, FaDollarSign, FaArrowUp, FaPlus } = icons
    const [activeItem, setActiveItem] = useState(null);
    
    const toggleActiveItem = (item) => {
      setActiveItem(activeItem === item ? null : item);
    };
  
    const handleChange = (field, value) => {
      setQuery((prev) => ({ ...prev, [field]: value }));
    }; 
    const itemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #ddd',
    };
  
    return (
      <div className="p-[4px] rounded-md w-full">
        <h3
          className="font-bold"
          style={{
            padding: '15px',
            fontSize: '26px',
          }}
        >
          Sắp xếp
        </h3>
        <ul>
          <li
            className="cursor-pointer"
            style={itemStyle}
            onClick={() => toggleActiveItem('size')}
          >
            <FaTshirt /> Size
            <FaPlus />
          </li>
          {activeItem === 'size' && (
            <div>
              <select
                className="w-full p-2 rounded-md"
                value={query.Size}
                onChange={(e) => handleChange('Size', e.target.value)}
              >
                <option value="">Chọn Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          )}
          <li
            className="cursor-pointer"
            style={itemStyle}
            onClick={() => toggleActiveItem('color')}
          >
            <FaPalette /> Màu Sắc
            <FaPlus />
          </li>
          {activeItem === 'color' && (
            <div>
              <select
                className="w-full p-2 rounded-md"
                value={query.Color}
                onChange={(e) => handleChange('Color', e.target.value)}
              >
                <option value="">Chọn Màu Sắc</option>
                <option value="Đỏ">Đỏ</option>
                <option value="Trắng">Trắng</option>
                <option value="Đen">Đen</option>
                <option value="Nâu">Nâu</option>
                <option value="Xanh">Xanh</option>
                <option value="Tím">Tím</option>
                <option value="Vàng">Vàng</option>

              </select>
            </div>
          )}
          <li
            className="cursor-pointer"
            style={itemStyle}
            onClick={() => toggleActiveItem('price')}
          >
            <FaDollarSign /> Mức Giá
            <FaPlus />
          </li>
          {activeItem === 'price' && (
            <div>
              <select
                className="w-full p-2 rounded-md"
                value={query.Price}
                onChange={(e) => handleChange('Price', e.target.value)}
              >
                <option value="">Chọn Mức Giá</option>
                <option value="ASC">Thấp đến Cao</option>
                <option value="DESC">Cao đến Thấp</option>
              </select>
            </div>
          )}
          <li
            className="cursor-pointer"
            style={itemStyle}
            onClick={() => toggleActiveItem('upgrade')}
          >
            <FaArrowUp /> Nâng cấp
            <FaPlus />
          </li>
          {activeItem === 'upgrade' && (
            <div>
              <select
                className="w-full p-2 rounded-md"
                value={query.Upgrade}
                onChange={(e) => handleChange('Upgrade', e.target.value)}
              >
                <option value="">Chọn Nâng Cấp</option>
                <option value="Cơ bản">Cơ Bản</option>
                <option value="Nâng cao">Nâng Cao</option>
                <option value="Cao cấp">Cao Cấp</option>
              </select>
            </div>
          )}
        </ul>
        <button
        className="flex items-center bg-blue-500 text-white m-[10px] px-6 py-2 rounded-lg shadow-sm hover:bg-blue-600"
        onClick={()=>setQuery({
          Size: '',
          Color: '',
          Price: '',
          Upgrade: '',
        })}
      >
        Bỏ Lọc
      </button>
      </div>
    );
};

export default memo(Sort);
