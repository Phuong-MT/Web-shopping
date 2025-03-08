import React,{useMemo, useState,useEffect} from 'react'
import { apigetInforOrderAdmin } from '../service';
import { Package, MapPin, Check} from 'lucide-react';

const ListOrder = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await apigetInforOrderAdmin();
          const currentData = response?.data;
          setData(currentData);
          setLoading(false);
        } catch (error) {
          console.error('Error in get infoOrder:', error);
          setError('Có lỗi xảy ra khi tải dữ liệu');
          setLoading(false);
        }
      };
      fetchOrders();
    }, []);

  // Group orders by postal code
  const groupedOrders = useMemo(() => {
    if (!data?.response) return {};
    
    const groups = {};
    data.response.forEach(order => {
      if (!groups[order.postalCode]) {
        groups[order.postalCode] = [];
      }
      groups[order.postalCode].push(order);
    });
    return groups;
  }, [data]);

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Package className="h-6 w-6" />
        Quản Lý Đơn Hàng
      </h1>

      {Object.entries(groupedOrders).map(([postalCode, orders]) => (
        <div key={postalCode} className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Postal Code Header */}
          <div className="border-b p-4 bg-gray-50">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <MapPin className="h-5 w-5" />
              Mã Bưu Chính: {postalCode}
            </h2>
          </div>

          {/* Orders Container */}
          <div className="p-4">
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Đơn hàng #{order.id}</span>
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <Check className="h-4 w-4" />
                      {order.status}
                    </span>
                  </div>
                  
                  {/* Order Items */}
                  {order.orderItem.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img 
                        src={item.imageUrl} 
                        alt={item.productname}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.productname}</h3>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2">
                            Size: {item.Size}
                          </span>
                          <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                            Số lượng: {item.quantity}
                          </span>
                        </div>
                        <p className="text-sm font-medium mt-2 text-blue-600">
                          {formatPrice(item.totalPrice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
 
export default ListOrder
