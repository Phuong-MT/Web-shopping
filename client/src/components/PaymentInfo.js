import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { apiGetAmount } from '../service';

const PaymentInfo = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await apiGetAmount();
          if(response?.data?.response){
            setPaymentData(response.data.response);
          }
      } catch (err) {
        setError('Không thể tải dữ liệu thanh toán.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [sortConfig, setSortConfig] = useState({
    key: 'created',
    direction: 'desc',
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sortedPayments = paymentData
    ? [...paymentData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : [];

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  if (isLoading) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div className="overflow-x-auto px-6 py-3 text-left text-xl font-medium uppercase tracking-wider ">
        Lịch sử thanh toán
    </div>
      <div className="overflow-x-auto ">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  ID
                  {sortConfig.key === 'id' && (
                    sortConfig.direction === 'asc' ? (
                      <ChevronUp className="ml-2 inline" size={16} />
                    ) : (
                      <ChevronDown className="ml-2 inline" size={16} />
                    )
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center">
                  Số Tiền
                  {sortConfig.key === 'amount' && (
                    sortConfig.direction === 'asc' ? (
                      <ChevronUp className="ml-2 inline" size={16} />
                    ) : (
                      <ChevronDown className="ml-2 inline" size={16} />
                    )
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại Tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng Thái
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('created')}
              >
                <div className="flex items-center">
                  Ngày Tạo
                  {sortConfig.key === 'created' && (
                    sortConfig.direction === 'asc' ? (
                      <ChevronUp className="ml-2 inline" size={16} />
                    ) : (
                      <ChevronDown className="ml-2 inline" size={16} />
                    )
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.id.length > 20 ? `${payment.id.substring(0, 20)}...` : payment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.currency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle2 className="mr-1" size={14} />
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(payment.created)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentInfo;
