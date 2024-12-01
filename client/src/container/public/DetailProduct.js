import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { apiGetProductLimit } from '../../service';
import Swal from 'sweetalert2'
import { apiPostOrder } from '../../service';

const DetailProduct = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const {postId} = useParams();
    const [product, setProduct] = useState(null); 
    const [error, setError] = useState('');
    const[formData, setFormData] = useState({
        name: '',
        productId: '',
        quantity:1,
        Size:'',
        price: '',
        imageUrl: '',
    })
    const [activeTab, setActiveTab] = useState('');
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiGetProductLimit(postId); 
                if (response?.data?.err === 0) {
                    const productData = response?.data?.response;
                    setProduct(productData);

                // Cập nhật formData với name và productId từ response
                    setFormData((prev) => ({
                        ...prev,
                        name: productData.name || '', // Đảm bảo có fallback khi không có dữ liệu
                        productId: productData.id || '', 
                        price :productData.price || '',
                        imageUrl: productData.images.imageUrl || ''
                    }));
                } else {
                    throw new Error(response?.data?.err || 'Error fetching product');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        if (postId) {
            fetchProduct();
        }
    }, [postId]);

    // Loading state
    if (!product && !error) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    // Error state
    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }
    const handleChange = (field,value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
      };
    const active = (size) =>{
        setActiveTab(size); // Cập nhật tab đang hoạt động
    }

    const handleQuantityChange = (operation) => {
        setFormData((prev) => ({
            ...prev,
            quantity: operation === 'increase' 
                ? prev.quantity + 1 
                : prev.quantity > 1 
                ? prev.quantity - 1 
                : prev.quantity
        }));
      };

// test 
console.log(formData)

    const handleSubmit = async()=> {
        if(!isLoggedIn){
            Swal.fire('Oops!', 'Bạn cần đăng nhập trước khi thêm sản phẩm', 'error');
        }
        else{
            if(formData.Size === ''){
                Swal.fire('Oops!', 'Bạn chưa chọn size', 'error');
            }
            else{
                try {
                    console.log(formData)
                    const response = await apiPostOrder(formData)
                    if(response?.data?.err === 0){
                        Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: `Đã thêm sản phảm ${formData.name} vào giỏ hàng` ,
                    });
                    }
                
                } catch (error) {
                    console.log(error)
                }
        }
        }
      };
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hình ảnh sản phẩm */}
                <div>
                    <img
                        src={product.images.imageUrl}
                        alt={product.name}
                        className="w-full rounded-lg shadow"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-4">Mã sản phẩm {product.id}</p>
                    <div>
                        <p className='text-xl font-medium text-gray-800 mb-4'>Size: </p>
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <button
                                key={size}
                                className={`border-2 mx-[2px] justify-items-center mb-[15px] p-2 ${
                                    activeTab === size ? 'underline bg-gray-500 text-white' : ''
                                }`}
                                onClick={() => {
                                    handleChange('Size', size);
                                    active(size);
                                }}
                            >
                                {size}
                            </button>
                        ))}
                        <p className='text-xl font-medium text-gray-800 mb-4'>Màu sắc:  {product.info.color}</p>
                        <div className='mb-4'>
                            <img 
                                alt={product.images.color}
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
                        </div>
                        <p className='text-xl font-medium text-gray-800 mb-4'>Số lượng :</p>
                        <div className="flex items-center space-x-4 border border-gray-300 rounded-lg p-4 w-48">
                            <button
                                onClick={() => handleQuantityChange('decrease')}
                                className="px-4 py-2 text-xl font-semibold bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                disabled={formData.quantity <= 1}
                            >
                                -
                            </button>
                            <span className="text-xl font-bold">{formData.quantity}</span>
                            <button
                                onClick={() => handleQuantityChange('increase')}
                                className="px-4 py-2 text-xl font-semibold bg-gray-200 rounded-md hover:bg-gray-300"

                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="text-xl font-semibold text-red-500 my-4">
                        Giá : {product.price}đ
                    </div>
                    {/* Các tuỳ chọn hoặc nút */}
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
                    onClick={()=>{
                        handleSubmit()
                    }}
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
