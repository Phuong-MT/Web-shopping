import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { Header } from './'
import { Fonter } from '../../components'
const System = () => {
    const { isLoggedIn } = useSelector(state => state.auth)

    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div>
            <div className='w-full  flex flex-col items-center'>
                <Header />
                <div className='flex w-full flex-auto'>
                    <div className='flex-auto bg-white shadow-md h-full p-4'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Fonter/>
        </div>
       
    )
}

export default System