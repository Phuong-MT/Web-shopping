import React, {useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { AdminHeader } from './index';

const Admin = () => {
  const { isAdmin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  return (
    <div>
      <div>
        <AdminHeader />
        <div className="w-full flex flex-col items-center">
          <div className="flex w-full flex-auto">
            <div className="flex-auto bg-white shadow-md h-full p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
