import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/constant'
const admin = () => {

  const isAdmin = false
   if (!isAdmin) return <Navigate to={`/${path.LOGIN}`} replace={true} />
  return (
    <div>
      
    </div>
  )
}

export default admin
