import React from 'react'

const InsertImages = ({images, active_image}) => {
  return (
    <div className=''>
        {
            images.map(el=>(
                <div key={el} className='img_details' onClick={(e)=>active_image(el)}>
                    <img className='small' src={el} />
                </div>
            ))
        }
    </div>
  )
}

export default InsertImages