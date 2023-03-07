import { Col, Row, Typography } from 'antd'
import React from 'react'
import './Dashboard.scss';
import { cardData, innerCard } from './DashboardMock';

const MainDashboard = () => {
  return (
      <div className='main-dashboard'>
          <Row gutter={[10,10]}>
              {cardData.map((item, index) => {
                  return (
                      <>
                         <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={24} >
                  <div className='card-main'>
                                  <div className='flex items-center p-2'>
                                      <div className='img-bg'>
                                          
                                      <img src={item.img} alt=""   /> 
                                      </div>
                                      
                                      <div className='ml-3'>
                                      <Typography>{item.cardTitle}</Typography>
                                      <Typography>{ item.cardNumber}</Typography>
                                      </div>
                                     
                                  </div>
                                  {item.cardNumber === '33' && (<>
                                  
                                    {item.status.map((item, index) => {
                                      return (
                                          <>
                                             
                                                 <div className='status flex justify-end'>
                                                  <Typography>
                                                      {item.red}<span className='ml-2'>{item.number}</span>
                                      </Typography>
                                      </div>
                                          </>
                                      )
                                  })}
                                  </>)}
                                
                               
              </div>
              </Col>  
                      
                      </>
                  )
              })}

              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                  <div className='graph-card'>
                  <Typography className='recent-card-typo'>Properties stats</Typography>
              </div>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
                  <div className='recent-card'>
                     <Typography className='recent-card-typo'>Recent Activities</Typography>
              </div>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
                  <div className='recent-card'>
                      <Typography className='recent-card-typo'>Recent Listing</Typography>
                      <div className='main-inner-cards'>
                          {innerCard.map((item, index) => {
                              return (<>
                               <div className='inner-card'>
                              <Row>
                                  <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
                                              <Typography><span>{item.name}</span><span>{ item.recentActivity}</span></Typography>
                                              <Typography>Address: { item.address}</Typography>
                                          </Col>
                                          <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
                                              <Typography>{item.price}</Typography>
                                              <div>
                                                  {item.status}
                                              </div>
                                  </Col>
                              </Row>  
                          </div>
                              </>)
                          })}
                         
                      </div>
              </div>
              </Col>
                  
           
      </Row>
      </div>
  )
}

export default MainDashboard