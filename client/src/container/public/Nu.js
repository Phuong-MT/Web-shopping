import { Banner, Sort } from '../../components'
import { banner } from '../../ultils/constant'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { formatVietnameseToString } from '../../ultils/Conmon/formatVietnameseToString'
import { apiGetProductQR } from "../../service";


const Nu = () => {
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [query, setQuery] = useState({
      Size: '',
      Color: '',
      Price: '',
      Upgrade: '',
    });
  useEffect(() => {
    const f = async function fetchData(){  
    const response = await apiGetProductQR(query);
    const data = response?.data?.response
    const filtered = data.filter((product) => product.category?.header === 'Nữ');
    setFilteredProducts(filtered);
  }
  f();
  }, [query]); // Chạy lại khi  danh sách sản phẩm thay đổi
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
    };
  return (
    <div className='gap-3'>
      <div className='flex mt-[20px] flex-wrap'>
        <div className='w-1/5 flex flex-col pr-[20px]'>
            <Sort query={query} setQuery={setQuery}/>
          </div>
        <div className='pl-[20px] w-4/5'>
          <h1 className='pb-[26px] text-2xl font-semibold'> NEW ARRIVAL</h1>
          {banner[0] && (
            <Banner
                key={banner[0].id}
                image={banner[0].image}
                name={banner[0].name}
            />
          )}
          <div className="flex flex-wrap mt-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
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
                                alt={product.images.color}
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
                                <p className="text-gray-700 items-center">{formatCurrency(product.price)}</p>
                            </div>
                        ))
                    
                    ) : (
                    <p>Không có sản phẩm nào trong danh mục này.</p>
                    )}
                </div>
        </div>
      </div>

    </div>
  )
}

export default Nu
