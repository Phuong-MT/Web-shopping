import React from 'react';
import logo from '../assets/logo.png'; // Đường dẫn đến logo
import appstore from '../assets/appstore.png'
import googleplay from '../assets/googleplay.png'
const Footer = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container ml-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Logo và Hotline */}
          <div className="w-full md:w-1/5 flex flex-col items-start">
            <img src={logo} alt="Logo" className="mb-4 w-32" />
            <div className="text-white bg-black py-2 px-4 rounded-md">
              <span className="text-sm font-medium">HOTLINE:</span>
              <span className="ml-2 text-lg font-bold">abcxyz</span>
            </div>
          </div>

          {/* Giới thiệu */}
          <div className="w-full md:w-1/5">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Giới thiệu</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#!" className="hover:text-black">Về Lucky Star</a></li>
              <li><a href="#!" className="hover:text-black">Tuyển dụng</a></li>
              <li><a href="#!" className="hover:text-black">Hệ thống cửa hàng</a></li>
            </ul>
          </div>

          {/* Dịch vụ khách hàng */}
          <div className="w-full md:w-1/5 flex flex-wrap gap-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Dịch vụ khách hàng</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#!" className="hover:text-black">Chính sách điều khoản</a></li>
                <li><a href="#!" className="hover:text-black">Hướng dẫn mua hàng</a></li>
                <li><a href="#!" className="hover:text-black">Chính sách thanh toán</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#!" className="hover:text-black">Chính sách đổi trả</a></li>
                <li><a href="#!" className="hover:text-black">Chính sách bảo hành</a></li>
                <li><a href="#!" className="hover:text-black">Chính sách giao nhận</a></li>
              </ul>
            </div>
          </div>

          {/* Liên hệ */}
          <div className="w-full md:w-1/6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Liên hệ</h3>
            <ul className="text-gray-600">
              <li><a href="he-thong/ho-tro-va-hoi-dap" className="hover:text-black">Hotline</a></li>
              <li><a href="he-thong/ho-tro-va-hoi-dap" className="hover:text-black">Email</a></li>
              <li><a href="#!" className="hover:text-black">Live Chat</a></li>
              <li><a href="#!" className="hover:text-black">Messenger</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/5">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Tải ứng dụng</h3>
            <div className="flex flex-col gap-4">
              <a href="#!" className="block">
                <img src={appstore} alt="App Store" className="h-12" />
              </a>
              <a href="#!" className="block">
                <img src={googleplay} alt="Google Play" className="h-12" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
