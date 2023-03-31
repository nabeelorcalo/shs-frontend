import React from 'react'
import { Row, Col, Typography } from 'antd';
import { Apply, InterView, InterviewIcon, Sun } from '../../../../assets/images';

const CardStatic = () => {
    return (
        <>
              <Row gutter={[15,15]}>
    <Col xxl={8} xl={10} lg={12} md={12} sm={24} xs={24}>
                    <div className='card-static '>
                       
                        <div className='card-upper'>
                            <div className='one'>
                            <Apply style={{height:"70px",width:"150px"}}/>
                        </div>
                            <Apply />
                            <div>
                            <Typography>Apply</Typography>
                        <Typography>06</Typography>
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
                            <Typography>Apply</Typography>
                        <Typography>06</Typography>
                            </div>
                      
                        </div> 
        </div>
    </Col>
    <Col xxl={8} xl={10} lg={12} md={12} sm={24} xs={24}>
        <div className='card-static three'>
                        <div className='flex items-center gap-x-6'>
                            
                            <Sun />
                            <Typography>23 ° C</Typography>
            </div>
        </div>
    </Col>
</Row>
      </>
  )
  
}

export default CardStatic