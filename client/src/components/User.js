import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const User = () => {
    const dispatch = useDispatch()
    const { currentData } = useSelector(state => state.user)
    useEffect(() =>{
        setTimeout(()=>{
            dispatch(actions.getCurrent())
        }, 1000)
    },[dispatch])
    return (
        <div className='flex items-center gap-2'>
            <div className='flex flex-col'>
                <span>Xin chào, <span className='font-semibold'>{currentData.name}</span></span>
            </div>
        </div>
    )
}

export default User