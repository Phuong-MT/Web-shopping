import React from 'react'
import { Searchitem } from '../../components'
// import { InputForm, Button } from '../../components'
import icons from '../../ultils/icons'

const {CiCirclePlus,IoChevronForwardCircleOutline, FiSearch} = icons
const Search = () => {
  return (
    <div className='p-[10px] w-4/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
        <span  className='cursor-pointer flex-1'><Searchitem
        IconsAfter = {CiCirclePlus}
        IconsBefore = {IoChevronForwardCircleOutline}
        text = 'Loại quần áo'/>
        </span>
        <span  className='cursor-pointer flex-1'><Searchitem
        IconsAfter = {CiCirclePlus}
        IconsBefore = {IoChevronForwardCircleOutline}
        text = 'Mức giá'/>
        </span>
        <span  className='cursor-pointer flex-1'><Searchitem 
        IconsAfter = {CiCirclePlus}
        IconsBefore = {IoChevronForwardCircleOutline}
        text = 'Size'/>
        </span>
        <span  className='cursor-pointer flex-1'><Searchitem 
        IconsAfter = {CiCirclePlus}
        IconsBefore = {IoChevronForwardCircleOutline}
        text = 'Màu sắc'/>
        </span>
        <span  className='cursor-pointer flex-1'>
        <Searchitem 
        IconsAfter = {CiCirclePlus}
        IconsBefore = {IoChevronForwardCircleOutline}
        text = 'Nâng cấp'/>
        </span>
       <button
            type='button'
            className='w-[100px] outline-none py-2 px-4 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium'
            >
            <FiSearch/>
            Tìm kiếm
        </button>
    </div>
  )
}

export default Search
