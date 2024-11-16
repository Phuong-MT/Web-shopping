import React , {memo} from 'react'

const banner = ({name, image}) => {

  return (
    <div>
      <img
          style={{
            borderRadius: '80px 0px 80px 0px',
            right: '-10px',
            height: '98%',
            }}
            src={image}
            alt={name}
        />
    </div>
  )
}

export default memo(banner)
