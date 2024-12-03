import React, { useEffect, useState }from "react";
import { useLocation, useParams,Link } from "react-router-dom";
import { apiGetProductSreach } from "../../service";
import { Sort } from "../../components";
import { formatVietnameseToString } from '../../ultils/Conmon/formatVietnameseToString'


const DetailSearch = () => {
  const location = useLocation();
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const searchParams = new URLSearchParams(location.search); // Lấy query string từ URL
  // Chuyển query string thành object
  const Sreach = {
    category: searchParams.get("category") || "",
    // price: searchParams.get("price") || "",
    // size: searchParams.get("size") || "",
    color: searchParams.get("color") || "",
    gender:searchParams.get("gender") || "",
    // upgrade: searchParams.get("upgrade") || "",
  };

  // const [query, setQuery] = useState({
  //   Size: '',
  //   Color: '',
  //   Price: '',
  //   Upgrade: '',
  // });

  useEffect(() => {
    const fetchSearchResults = async () => {
      setError(null); // Xóa lỗi cũ
      try {
        const response = await apiGetProductSreach(Sreach)
        
        setData(response.data.response); // Lưu dữ liệu trả về

        // const filtered = data.filter((product) => 
        // {

        // });
        // setFilteredProducts(filtered)
      } catch (err) {
        setError(err.message); // Xử lý lỗi
      }
      };

    fetchSearchResults();
  }, [location.search]); // Chỉ gọi lại khi URL thay đổi

  useEffect(() =>{

  })
  return (
    <div className='gap-3'>
      <div className='flex mt-[20px] flex-wrap'>
        {/* <div className='w-1/5 flex flex-col pr-[20px]'>
        <Sort/>
          </div> */}
        <div className='pl-[20px] '>
          <div className="flex flex-wrap mt-4">
                    {data.length > 0 ? (
                        data.map((product, index) => (
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
                                <p className="text-gray-700 items-center">{product.price}đ</p>
                            </div>
                        ))
                    
                    ) : (
                    <p>Không có sản phẩm nào trong danh mục này.</p>
                    )}
                </div>
        </div>
      </div>

    </div>
  );
};

export default DetailSearch;
