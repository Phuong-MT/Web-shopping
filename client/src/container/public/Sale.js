import React from 'react'
import { location } from '../../ultils/constant'
import { Banner, Sort } from '../../components'


const Sale = () => {
  return (
    <div>
      <div className='flex mt-[20px] flex-wrap'>
          <div className='w-1/4 flex flex-col pr-[20px]'>
              <Sort/>
          </div>
          <div className='pl-[20px] w-3/4 '>
              <h1 className='pb-[26px] text-2xl font-semibold	'> Tháng Vàng Săn - SALE | FALL - WINTER COLLECTION 2024 </h1>
              <div className='mb-[50px]'>
              {location[3] && (
              <Banner
                  key={location[3].id}
                  image={location[3].image}
                  name={location[3].name}
              />
              )}
              </div>
              <div className='w-full border border-b-gray-500 flex flex-wrap'>
              {/* link anh */}
              </div>
          </div>
      </div>
  </div>
  )
}

export default Sale
