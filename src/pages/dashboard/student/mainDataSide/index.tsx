import React from 'react'
import { Row, Col, Typography, Avatar } from 'antd';
import CardStatic from './CardStatic';
import DicoverSlider from './DicoverSlider';
import JobSlider from './JobSlider';
import VerificationForm from '../VerificationFomr';





const MainDataSide = () => {

  return (
    <div className='main-data-side'>
      <div >
        <CardStatic />
        <div className='recent-jobs  pt-7 pb-3' >
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