import React, {useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import {apiGetCategories} from '../../service/category'
import { formatVietnameseToString } from '../../ultils/Conmon/formatVietnameseToString'


// const notActive = 'hover:bg-secondary2 px-4 flex items-center bg-secondary1'
// const active = 'hover:bg-secondary2 px-4 h-full flex items-center  bg-secondary2'
const Navigation = ()=>{
    const [categories, setCategories] = useState([])
    useEffect (() => {
        const fetchCategories = async () => {
            const response = await apiGetCategories()
            if(response?.data.err === 0){
                setCategories(response.data.response)
            }
            }
        fetchCategories()
    }, [])
        return (
            <div className='w-full flex m-[5px]  h-[30px] py-4  text-black '>
                 <div className='w-full flex h-full items-center text-sm font-medium '>
                    <NavLink
                        to={'/'}
                        className= ' p-4 h-full items-center hover:text-orange-500'
                        >
                        TRANG CHỦ
                    </NavLink>
                    {categories?.length > 0 && categories.map(item => {
                        return (
                            <div key={item.code} className='items-center  px-4 h-full' >
                                
                                <NavLink
                                    to={`/${formatVietnameseToString(item.header)}`}
                                    className= ' p-4 h-full items-center hover:text-orange-500'
                                >
                                    {item.header}
                                    
                                </NavLink>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        )
}
export default Navigation