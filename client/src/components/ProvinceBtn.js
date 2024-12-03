import React, {memo} from 'react'
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Conmon/formatVietnameseToString'
const ProvinceBtn = ({name, image}) => {
  return (
    <div className='shadow-md rounded-bl-md text-blue-700 rounded-br-md cursor-pointer hover:text-orange-600'>
        <Link
          to={`${formatVietnameseToString(name)}`}
          >
          <img
              src={image}
              alt={name}
              className=' w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md'
          />
        
          <div className='font-medium p-2 text-center'>{name}</div>
        </Link>
    </div> 
  )
}

export default memo(ProvinceBtn)
