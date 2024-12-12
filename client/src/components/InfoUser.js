import React,{useState, useEffect} from 'react'
import { apiInfoUser } from '../service/admin'

const InfoUser = () => {
  const [formData, setformDta] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await apiInfoUser();
            if(response?.data?.response){
              setformDta(response.data.response)
            }
        } catch (err) {
          setError('Không thể tải dữ liệu thanh toán.');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  if (isLoading) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }
  
  return (
    <div className="w-full m-1 mx-auto shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-50 border-b p-4">
        <h2 className="text-xl font-bold text-blue-800">
          Thông Tin Người Dùng
        </h2>
      </div>
      <div className="p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border-b text-gray-600 font-semibold">ID</th>
              <th className="p-3 text-left border-b text-gray-600 font-semibold">Họ Tên</th>
              <th className="p-3 text-left border-b text-gray-600 font-semibold">Điện Thoại</th>
              <th className="p-3 text-left border-b text-gray-600 font-semibold">Email</th>
              <th className="p-3 text-left border-b text-gray-600 font-semibold">Địa Chỉ</th>
              <th className="p-3 text-left border-b text-gray-600 font-semibold">Giới Tính</th>
              <th className="p-3 text-left border-b text-gray-600 font-semibold">Ngày Sinh</th>
              <th className="p-3 text-left border-b text-gray-600 font-semibold">Ngày Tạo</th>
              <th className="p-3 text-left border-b text-gray-600 font-semibold">Cập Nhật</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 border-b text-gray-700">{user.id}</td>
                <td className="p-3 border-b text-gray-700">{user.name}</td>
                <td className="p-3 border-b text-gray-700">{user.phone}</td>
                <td className="p-3 border-b text-gray-700">{user.email}</td>
                <td className="p-3 border-b text-gray-700">{user.address}</td>
                <td className="p-3 border-b text-gray-700">{user.gender}</td>
                <td className="p-3 border-b text-gray-700">{formatDate(user.dateOfBirth)}</td>
                <td className="p-3 border-b text-gray-700">{formatDate(user.createdAt)}</td>
                <td className="p-3 border-b text-gray-700">{formatDate(user.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InfoUser
