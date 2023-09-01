import React from 'react'
import CardStatic from './CardStatic';
import DicoverSlider from './DicoverSlider';
import JobSlider from './JobSlider';

const MainDataSide = () => {

  return (
    <div className='main-data-side'>
      <div>
        <CardStatic />
        <div className='recent-jobs pt-7 pb-3' >
          <JobSlider />
        </div>
        <div className='discover pt-3'>
          <DicoverSlider />
        </div>
      </div>
    </div>
  )
}

export default MainDataSide