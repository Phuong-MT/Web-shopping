import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import {Navigation, Search} from './index'
import {useSelector } from 'react-redux'

const Home = () => {
   
    const { isLoggedIn } = useSelector(state => state.auth)
    
    return (
        <>
            <div className='w-full flex  flex-col justify-items-center  h-full'>
                <Header/>
                <Navigation/>
                <header className='justify-items-center'>
                    {isLoggedIn && <Search />}
                </header> 
                <div className='w-full  justify-items-center  mt-3'>
                    <Outlet />
                </div>
            </div>
        </>
       
    )
}

export default Home