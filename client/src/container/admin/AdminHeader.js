import React from 'react';
import { Bell, Menu, User, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { Button} from '../../components'
import * as actions from '../../store/actions'
import icons from '../../ultils/icons'

const AdminHeader = () => {
  const { IoLogIn } = icons
  const dispatch = useDispatch()
  const { isAdmin } = useSelector(state => state.admin)
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-6 py-4">
      <div className="w-full flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-500 rounded-full p-2">
            <User size={36} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-xl">Admin</p>
            <p className="text-lg text-gray-500">Quản trị viên</p>
          </div>
        </div>
        <div className='flex-1 items-center space-x-4'>
            {isAdmin &&
            <Button 
              text={'Đăng xuất'} 
              textColor={'text-white'} 
              bgColor={'bg-blue-500'} 
              IcBefore= {IoLogIn}
              onClick={() => dispatch(actions.logoutadmin())}
              />

            }
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;