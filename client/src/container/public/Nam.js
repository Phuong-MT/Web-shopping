import React from 'react'
import { Banner, Sort } from '../../components'
import { banner } from '../../ultils/constant'
const Nam = () => {
  return (
    <div>
      <div className='flex mt-[20px] flex-wrap'>
        <div className='w-1/4 flex flex-col pr-[20px]'>
          <Sort/>
        </div>
        <div className='pl-[20px] w-3/4'>
          <h1 className='pb-[26px] text-2xl font-semibold'> NEW ARRIVAL</h1>
          {banner[1] && (
            <Banner
                key={banner[1].id}
                image={banner[1].image}
                name={banner[1].name}
            />
          )}
        </div>
      </div>

    </div>
  )
}

export default Nam
