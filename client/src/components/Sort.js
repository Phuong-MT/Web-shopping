import React ,{memo} from 'react'
import icons from '../ultils/icons'

const Sort = () => {
    const {  FaTshirt, FaPalette, FaDollarSign, FaArrowUp,FaPlus } = icons
    //style const
    const itemside = {
        borderBottom:'1px solid black',
        marginBottom: '16px',
        fontSize: '18px',
        fontWeight:'normal',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        padding: '5px 10px',
        justifyContent: 'space-between',
    }
  return (
    <div className='p-[4px] rounded-md w-full'>
        <h3 className='font-bold'
        style={{
            padding:'15px',
            fontSize: '26px',
            
        }}> Sắp xếp</h3>
         <ul>
            <li  className='cursor-pointer' style={itemside}>
                <FaTshirt /> Size
                <FaPlus />
            </li>
            <li className='cursor-pointer' style={itemside}>
                <FaPalette /> Màu Sắc
                <FaPlus />
            </li>
            <li className='cursor-pointer' style={itemside}>
                <FaDollarSign /> Mức Giá
                <FaPlus />
            </li>
            <li className='cursor-pointer' style={itemside}>
                <FaArrowUp /> Nâng cấp
                <FaPlus />
            </li>
        </ul>
      <div>

      </div>
    </div>
  )
}

export default memo(Sort)
