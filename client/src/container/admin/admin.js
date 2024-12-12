import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/constant'
import {AdminHeader} from './index'
const Admin = () => {
  return (
    <div>
      <div>
        <AdminHeader />
            <div className='w-full  flex flex-col items-center'>
                <div className='flex w-full flex-auto'>
                    <div className='flex-auto bg-white shadow-md h-full p-4'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin
