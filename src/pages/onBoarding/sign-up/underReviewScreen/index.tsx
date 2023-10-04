import React from 'react'
import { Col, Row, Typography } from 'antd'
import { SHSLogo } from '../../../../assets/images'

const UnderReviewScreen = () => {
  return (
    <>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <div className='p-3 flex justify-center md:justify-start'>
            <SHSLogo />
          </div>
          <center className='mt-[20rem]'>
            <Typography className='golden-text-color font-semibold text-xl mb-4'>
              Your ID verification process is under review.
            </Typography>
            <Typography className='gray-text-color font-semibold text-sm'>
              We will inform via email once your verification is completed
            </Typography>
          </center>
        </Col>
      </Row>
    </>
  )
}

export default UnderReviewScreen