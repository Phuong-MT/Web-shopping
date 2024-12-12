import React, { useState } from 'react';
import { Lock, User, LogIn } from 'lucide-react';

const Adminlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hàm xử lý đăng nhập (mock)
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Đây là một ví dụ đơn giản, trong thực tế bạn sẽ gọi API để xác thực
    const validUsername = 'admin';
    const validPassword = 'admin123';

    if (username === validUsername && password === validPassword) {
      // Đăng nhập thành công
      localStorage.setItem('isAdminLoggedIn', 'true');
      // Chuyển hướng đến trang admin
      window.location.href = '/admin/';
    } else {
      // Đăng nhập thất bại
      setError('Tên đăng nhập hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleLogin} 
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Đăng Nhập Admin</h2>
            <p className="text-gray-600 mt-2">Quản trị hệ thống</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              {error}
            </div>
          )}

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Tên Đăng Nhập
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mật Khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <LogIn className="mr-2" size={20} />
              Đăng Nhập
            </button>
            <a 
              href="#" 
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Quên mật khẩu?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Adminlogin;