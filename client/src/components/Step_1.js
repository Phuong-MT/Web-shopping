import React,{useState, useEffect} from 'react'
import { InputFormV2 } from './index';
import { apigetOrder, apiCheckout } from '../service';
const Step = () => {
    {/*  Lấy thông tin thanh toán */}

    const [Data,setData] = useState([])
    useEffect(() =>{
      const f = async() => {
        try {
            const response = await apigetOrder()
            const currentData = response?.data?.response
           setData(currentData)
        } catch (error) {
            console.log('error in get shoping-cart' + error)
        }
      }
      f();
    },[])
    const total = Data.reduce(
      (acc, order) =>
          acc +
          order.orderItem.reduce((sum, item) => sum + item.price*item.quantity, 0),
      0
  );


  {/*XỬ LÝ DỮ LIỆU GỬI ĐI */}
  const [formData, setFormData] = useState({
    name:  '',
    phone:'',
    city:'',
    district:'',
    address:'',
    });
  const [errors, setErrors] = useState({}); // Lưu trữ lỗi của form
  const handleChange = (field, value) => {
      setFormData((prevData) => ({
          ...prevData,
          [field]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: "", // Xóa lỗi khi người dùng chỉnh sửa
      }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra họ tên
    if (!formData.name.trim()) {
      newErrors.name = "Họ tên không được để trống.";
    }

    // Kiểm tra số điện thoại
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống.";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải gồm 10-11 chữ số.";
    }

    // Kiểm tra thành phố
    if (!formData.city) {
      newErrors.city = "Vui lòng chọn tỉnh/thành phố.";
    }

    // Kiểm tra quận/huyện
    if (!formData.district) {
      newErrors.district = "Vui lòng chọn quận/huyện.";
    }

    // Kiểm tra phường/xã
    if (!formData.address.trim()) {
      newErrors.address = "Phường/xã không được để trống.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về `true` nếu không có lỗi
  };
  const handleCompleteOrder = async () => {
    if (!validateForm()) {
      // Nếu form không hợp lệ, dừng việc gửi API
      alert("Vui lòng kiểm tra thông tin và thử lại.");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        address: {
          city: formData.city,
          district: formData.district,
          address: formData.address,
        },
      };
     const response = await apiCheckout({amount: total})
     window.location.href = response.data;
     console.log(response)
    } catch (error) {
      console.error("Error:", error);
      alert("Đặt hàng thất bại! Vui lòng thử lại.");
    }
  };


    return (
      <div className="max-w-4xl mx-auto py-10">
      {/* Progress bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex-1 border-b-4 border-black text-center pb-2">Giỏ hàng</div>
        <div className="flex-1 border-b-4 border-black text-center pb-2">Đặt hàng</div>
        <div className="flex-1 border-b-4 text-center pb-2">Thanh toán</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          <h2 className="text-lg font-bold mb-4">Địa chỉ giao hàng</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <InputFormV2
                label="Họ tên"
                value={formData.name}
                onChange={(value) => handleChange('name', value)}
            />
              <InputFormV2
                label="Số Điện Thoại"
                value={formData.phone}
                onChange={(value) => handleChange('phone', value)}
            />
            </div>
            <div className="grid grid-cols-2 gap-4">
            <InputFormV2
                label="Tỉnh/Thành Phố"
                value={formData.city}
                onChange={(value) => handleChange('city', value)}
            />
             <InputFormV2
                label="Quận/Huyện"
                value={formData.district}
                onChange={(value) => handleChange('district', value)}
            />
            </div>
            <InputFormV2
                label="Địa chỉ cụ thể"
                value={formData.address}
                onChange={(value) => handleChange('address', value)}
            />
          </form>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tổng tiền hàng</span>
              <span>{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>0đ</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Tiền thanh toán</span>
              <span>{total}</span>
            </div>
          </div>
          <button
            onClick={handleCompleteOrder}
            className="mt-6 w-full bg-black text-white py-3 rounded"
          >
            Thanh Toán
          </button>
        </div>
      </div>
    </div>
  )
}

export default Step
