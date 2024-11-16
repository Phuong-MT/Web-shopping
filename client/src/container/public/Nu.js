import React from 'react'
import { Banner, Sort } from '../../components'
import { banner } from '../../ultils/constant'

const Nu = () => {
 
  return (
    <div className='gap-3'>
      <div className='flex mt-[20px] flex-wrap'>
        <div className='w-1/4 flex flex-col pr-[20px]'>
          <Sort/>
        </div>
        <div className='pl-[20px] w-3/4'>
          <h1 className='pb-[26px] text-2xl'> NEW ARRIVAL</h1>
          {banner[0] && (
            <Banner
                key={banner[0].id}
                image={banner[0].image}
                name={banner[0].name}
            />
          )}
        </div>
      </div>

    </div>
  )
}

export default Nu
