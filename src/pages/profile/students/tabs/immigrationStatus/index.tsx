import { Col, Row, Typography } from 'antd'
import React from 'react'
import tick from '../../../../../assets/images/profile/student/Tick.svg'
import '../Tabs.scss';
const ImmigrationStatus = () => {
  return (
      <div className='immigration-status'>
          <div>
              
              <Typography className='title'>Check a Job applicant’s right to work</Typography>
          </div>
              
          <Row gutter={20}>
              <Col xxl={6} xl={6} lg={6} md={8} sm={12} xs={24}>
                  <div className='status-card'>
                      <center>
                          <img src={tick} alt="" />
                          <Typography>Have share code!</Typography>
                      </center>
              </div>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={8} sm={12} xs={24}>
                  <div className='status-card'>
                      <center>
                          <img src={tick} alt="" />
                          <Typography>Have share code!</Typography>
                      </center>
              </div>
              </Col>
          </Row>
    </div>
  )
}

export default ImmigrationStatus