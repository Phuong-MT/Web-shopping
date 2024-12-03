import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproduct } from '../../store/actions';
import { formatVietnameseToString } from '../../ultils/Conmon/formatVietnameseToString'

const List = () => {
  const [activeTab, setActiveTab] = useState('Lucky Moda'); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product); 

  useEffect(() => {
    // Lấy tất cả sản phẩm khi component được render
    dispatch(getproduct());
  }, [dispatch]);

  useEffect(() => {
    // Lọc sản phẩm theo tab đang hoạt động
    const filtered = products.filter((product) => product.category?.header === activeTab);
    setFilteredProducts(filtered);
  }, [activeTab, products]); // Chạy lại khi tab hoặc danh sách sản phẩm thay đổi

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Cập nhật tab đang hoạt động
  };
  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="w-full flex flex-wrap">
        {['Lucky Moda', 'Lucky Men', 'Lucky Kids'].map((tabName) => (
          <button
            key={tabName}
            className={`w-1/3 justify-items-center mb-[15px] p-2 ${
              activeTab === tabName ? ' underline' : ''
            }`}
            onClick={() => handleTabClick(tabName)}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="flex flex-wrap mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            index < 10   ? (
            <div key={product.id} className="product-item p-4  mb-4">
              {/* <p className="text-gray-500">Danh mục: {product.category?.header}</p> */}
              <img
                src={product.images.imageUrl}
                alt={product.name}
                style={{
                  width: '220px',
                  height:'auto',
                  marginRight:'5px'
                }}
              />
              <img 
                src ={product.images.color}
                style={{
                      marginTop: '5px',
                      marginLeft: '20px',
                      border: '1px solid black',
                      borderRadius: '50%',
                      padding: '2px',
                      boxSizing: 'border-box',
                      width: '18px',
                      height: '18px'
                  }}
                />
                <Link to = {`/chi-tiet/${formatVietnameseToString(product.name)}/${product.id}`}>
                <h3 className="text-lg font-sm w-[220px]">{product.name}</h3>
                </Link>
                <p className="text-gray-700 items-center">{product.price}đ</p>
            </div>
          ):' '
          ))
          
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>
      <Link to={`/${formatVietnameseToString(activeTab)}`}>
      <div className='flex flex-col items-center'>
        <span style={{
          border: '1px solid #221F20',
          borderRadius: '24px 0px',
          padding: '13px 24px',
          fontSize: '16px',
          lineHeight: '20px',
          }}
        >Xem tất cả</span>
      </div>
      </Link>
    </div>
  );
};

export default List
