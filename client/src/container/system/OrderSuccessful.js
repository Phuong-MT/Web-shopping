import React, { useMemo, useState,useEffect } from 'react';
import { apigetInfoOrderSuccessful, apiRefundPayment } from '../../service'
import { Package, MapPin, Check, Loader2, RefreshCcw, AlertTriangle,CircleX  } from 'lucide-react';
import Swal from 'sweetalert2'

const OrderSuccessful = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingRefund, setProcessingRefund] = useState(null); // Track which postal code is being refunded
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPostalCode, setSelectedPostalCode] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apigetInfoOrderSuccessful();
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

  // Calculate total amount for a postal code group
  const calculateGroupTotal = (orders) => {
    return orders.reduce((total, order) => {
      const orderTotal = order.orderItem.reduce((sum, item) => 
        sum + Number(item.totalPrice), 0);
      return total + orderTotal;
    }, 0);
  };
  const canRefund = (orders) => {
    return orders.every(order => order.status === 'Order Successful');
  };

  const handleRefundClick = (postalCode) => {
    setSelectedPostalCode(postalCode);
    setShowConfirm(true);
  };

  // Handle refund for a postal code group
  const handleRefund = async (postalCode) => {
    try { 
      setShowConfirm(false);
      setProcessingRefund(postalCode);

      const result = await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await apiRefundPayment(postalCode);
          resolve(response);
        } catch (error) {
          console.error('Error in post Refund:', error);
          reject(error);
        }
      }, 1500);
      });
      // Hiển thị thông báo thành công (có thể thay bằng toast notification)
       Swal.fire({
                icon: 'success',
                title: 'Oops!',
                text: `Refund yêu cầu đã được gửi thành công` ,
            })
      
    } catch (error) {
      console.error('Error processing refund:', error);
      Swal.fire({
        icon: 'errorerror',
        title: 'Oops!',
        text: `Refund yêu cầu đã được gửi thành công` ,
    })
    } finally {
      setProcessingRefund(null);
      setSelectedPostalCode(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!data?.response || data.response.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Không có đơn hàng nào
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Package className="h-6 w-6" />
        Quản Lý Đơn Hàng
      </h1>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-2 text-yellow-600 mb-4">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Xác nhận Refund</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Bạn chỉ được hoàn tiền 90% số tiền thanh toán, do đơn đã đặt và đang chuẩn bị giao hàng đến bạn!
            </p> <p className="text-gray-600 text-xl mb-6 underline decoration-solid">
              Bạn có chắc chắn muốn refund tất cả đơn hàng với mã bưu chính: {selectedPostalCode}?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedPostalCode(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleRefund(selectedPostalCode)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Xác nhận Refund
              </button>
            </div>
          </div>
        </div>
      )}
      {Object.entries(groupedOrders).map(([postalCode, orders]) => (
        <div key={postalCode} className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Postal Code Header with Refund Button */}
          <div className="border-b p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <MapPin className="h-5 w-5" />
                Mã Bưu Chính: {postalCode}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Tổng tiền: {formatPrice(calculateGroupTotal(orders))}
                </span>
                {canRefund(orders) ? (
                  <button
                    onClick={() => handleRefundClick(postalCode)}
                    disabled={processingRefund === postalCode}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all
                      ${processingRefund === postalCode 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-red-500 hover:bg-red-600'}`}
                  >
                    {processingRefund === postalCode ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <RefreshCcw className="h-4 w-4" />
                        Refund
                      </>
                    )}
                  </button>
                ):
                <div className='flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all bg-red-500'>
                  <CircleX  />
                  Cancel
                </div>
                
                }
                
              </div>
            </div>
          </div>

          {/* Orders Container */}
          <div className="p-4">
            <div className="space-y-4">
              {orders.map(order => (

                <div key={order.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    {/* <span className="font-medium">Đơn hàng #{order.id}</span> */}
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
};

export default OrderSuccessful
