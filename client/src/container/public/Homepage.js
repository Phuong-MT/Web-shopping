import React from 'react'
import {List} from './index'
import {text} from '../../ultils/constant'
import { Province } from '../../components'
const Homepage = () => {
return (
    <div className='w-full flex flex-col  gap-3'>
        
        <Province />
        <section className='justify-items-center'>
            <h1 className='text-[28px] font-bold underline'>{text.HOME_TITLE1}</h1>
            <p> {text.HOME_DESCRIPTION}</p>
        </section>
        <section className='w-full gap-3' >
            <div className='w-full'>
                <List/>
            </div>
        </section>
        <section>
        </section>
    </div>
)
}

export default Homepage
