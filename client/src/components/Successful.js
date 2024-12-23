import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { CheckCircle, Truck, Package, Calendar, MapPin, Copy, ArrowRight, User  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apigetShippingAddress } from '../service';

const Successful = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null)
//gửi api lấy thông tin đặt hàng.
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await apigetShippingAddress(id)
          console.log(response)
          if(response?.data?.err){
            setError(`${response?.data?.err} lỗi truy cập thông tin giao hàng, bạn có đang tấn công route`)
          }
          if(response?.data?.response){
            setData(response?.data?.response)
          }
         
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    }, [id]);
    console.log(data)
  const addOneWeek = (dateString) => {
    const date = new Date(dateString); 
    date.setDate(date.getDate() + 7);  
    return date.toISOString();        
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  const handleCopyOrderId = (id) => {
    navigator.clipboard.writeText(id);
    alert(`Order ID: ${id} đã được sao chép vào clipboard.`);
  };
  const handleNavigate = () => {
    navigate('/he-thong/dav')
  }
  const handleNavigateLocal = () =>{
    navigate('/')
  }
  if (isLoading) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex-1 border-b-4 border-black text-center pb-2">Giỏ hàng</div>
        <div className="flex-1 border-b-4 border-black text-center pb-2">Đặt hàng</div>
        <div className="flex-1 border-b-4  border-black text-center pb-2">Đặt hàng thành công</div>
      </div>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-green-500 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-white p-3">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-green-100">
            Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi
          </p>
        </div>

        {/* Order Info Section */}
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
            <div>
              <p className="text-gray-600 text-sm">Mã đơn hàng</p>
              <p className="font-medium">{data.postalCode}</p>
            </div>
            <button 
              onClick={() => handleCopyOrderId(data.postalCode)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Copy className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          {/* Receiver Information */}
          <div className="flex items-start gap-4 mb-6">
            <div className="rounded-full bg-green-100 p-2">
              <User className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium">Thông tin người nhận</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>Họ tên: {data.fullName}</p>
                <p>Số điện thoại: {data.phoneNumber}</p>
              </div>
            </div>
          </div>
          {/* Delivery Status */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 p-2">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Đang chuẩn bị hàng</h3>
                <p className="text-sm text-gray-600">Dự kiến đóng gói xong trong 24h</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-purple-100 p-2">
                <Truck className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium">Thông tin vận chuyển</h3>
                <p className="text-sm text-gray-600">Giao hàng tiết kiệm - J&T Express</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-orange-100 p-2">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium">Thời gian giao hàng dự kiến</h3>
                <p className="text-sm text-gray-600">{formatDate(data.createdAt)} - {formatDate(addOneWeek(data.createdAt))}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-red-100 p-2">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium">Địa chỉ giao hàng</h3>
                <p className="text-sm text-gray-600">
                  {data.addressLine2}<br />
                  {data.addressLine1}<br />
                  {data.city}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          {/* <div className="mt-6 border-t pt-6">
            <h3 className="font-medium mb-4">Chi tiết đơn hàng</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tạm tính</span>
                <span>{data.a}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span>40,000₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Giảm giá</span>
                <span className="text-green-500">-40,000₫</span>
              </div>
              <div className="flex justify-between font-medium pt-4 border-t">
                <span>Tổng cộng</span>
                <span className="text-lg">1,990,000₫</span>
              </div>

            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              onClick={handleNavigate }
            >
              Theo dõi đơn hàng
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
             onClick={handleNavigateLocal }
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-8 text-center text-gray-600">
        <p>Cần hỗ trợ? <button className="text-green-500 hover:underline">Liên hệ chúng tôi</button></p>
      </div>
     </div>
    </div>
  )
}

export default Successful
