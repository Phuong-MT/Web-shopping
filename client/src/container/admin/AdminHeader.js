import React from 'react';
import { Bell, Menu, User, Search } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-500 rounded-full p-2">
            <User size={36} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-xl">Admin</p>
            <p className="text-lg text-gray-500">Quản trị viên</p>
          </div>
        </div>
        <div>
            
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;