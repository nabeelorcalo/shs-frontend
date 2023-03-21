import React from 'react'
import { PageHeader } from '../../../components'
import { Row, Col, Typography, Button, Divider } from 'antd';
import '../style.scss';
import { bankInfo } from './withdrawalMock';

const balance = '2000.00';

const LinkAccount = () => {
  return (
      <div className='link-account'>
          <PageHeader title='Withdrawals' bordered={true} />
          <Row>
              <Col xxl={12} xl={12} lg={12} md={24} xs={24}>
              <Typography
              className='text-[#14142A] 
              text-xl font-semibold
              mt-4 mb-5'>
              Current Balance : ${balance}
            </Typography>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={24} xs={24} className='flex justify-end'>
                  <Button className='teriary-light-bg-color white-color text-base font-semibold'>Add New</Button>
              </Col>
          </Row>
          <Row>
              <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
                  <div className='card-style'>
                      <Row>
                          <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
                              <Typography className='primary-color text-lg font-medium ml-3 mt-2'>Banks</Typography>

                          </Col>
                      </Row>
                      <Divider />
                    
                      {bankInfo.map((item, index) => {
                          return (
                              <>
                                <div className='details'>
                                      <div className='flex items-center gap-x-3'>
                                          <img src={item.img} alt="" />
                                          <div className='grid'>
                                              <Typography>{item.bankName }</Typography>
                                              <Typography>{item.account }</Typography>
                                          </div>
                                      </div>
                                      <Button>pen</Button>
                          </div>
                              </>
                          )
                      })}
                    
                      
                  </div>
              </Col>
          </Row>
    </div>
  )
}

export default LinkAccount