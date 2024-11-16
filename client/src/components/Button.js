import React, { memo } from 'react'

const Button = ({ text, textColor, bgColor, IcBefore, onClick, fullWidth, px }) => {
    return (
        <button
            type='button'
            className={`py-2 ${px ? px : 'px-2'} ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
            onClick={onClick}
        >
            <span>{IcBefore && <IcBefore />}</span>
            <span className='font-sans'> {text}</span>
            
        </button>
    )
}

export default memo(Button)