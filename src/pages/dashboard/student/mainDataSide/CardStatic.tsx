import React from 'react'
import { Row, Col, Typography } from 'antd';
import { Apply, InterView, LocationSun, Sun } from '../../../../assets/images';

const CardStatic = () => {
    return (
        <>
              <Row gutter={[15,15]}>
    <Col xxl={8} xl={10} lg={12} md={12} sm={24} xs={24}>
                    <div className='card-static '>   
                        <div className='card-upper'>
                            <div className='one'>
                            <Apply style={{height:"100px",width:"100px"}}/>
                        </div>
                            <Apply />
                            <div>
                            <Typography className='card-head'>Apply</Typography>
                        <Typography className='card-number'>06</Typography>
                            </div>
                      
                        </div> 
                        
        </div>
    </Col>
    <Col xxl={8} xl={10} lg={12} md={12} sm={24} xs={24}>
        <div className='card-static '>
                        <div className='two'>
                        <InterView />
                        </div>
                        <div className='card-upper'>
                        <div className='two'>
                        <InterView />
                        </div>
                            <InterView />
                            <div>
                            <Typography className='card-head'>Interviews</Typography>
                        <Typography className='card-number'>03</Typography>
                            </div>
                      
                        </div> 
        </div>
    </Col>
    <Col xxl={8} xl={10} lg={12} md={12} sm={24} xs={24}>
        <div className='card-static three'>
                        <div className='flex items-center gap-x-6'>
                            
                            <Sun />
                            <Typography className='temp'>23 ° C</Typography>
            </div>
                        <div>
                            <Typography className='date-sun'>Monday, 21 September</Typography>
                            <Typography className='location'><LocationSun/> London</Typography>
                        </div>
                        
        </div>
    </Col>
</Row>
      </>
  )
  
}

export default CardStatic