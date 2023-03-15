import React from 'react'
import { Schedule } from "../../assets/images/"
const Interview = () => {
  return (
    <div>
      <button className='req-btn flex items-center justify-center cursor-pointer'>
        <Schedule />
        <p className='btn-text'>Schedule</p>
      </button>
    </div>
  )
}

export default Interview
