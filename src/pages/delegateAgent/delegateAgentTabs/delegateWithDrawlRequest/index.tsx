import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { DropDown, SearchBar } from '../../../../components'

const WithDrawalRequest = () => {
    const [value, setValue] = useState('');

    const searchValue = () => {
    
}


  return (
      <div className='with-drawal-request'>
          
          <Row>
              <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                  <SearchBar handleChange={searchValue}/>
              </Col>
              <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                  <div className='flex  justify-center md:justify-end gap-3 mt-3 md:mt-0'>
                  <DropDown
                        name='Status'
                        value={value}
                        options={['item 1', 'item 2', 'item 3']}
                        setValue={setValue}
                    />
              <DropDown
                        name='Method'
                        value={value}
                        options={['item 1', 'item 2', 'item 3']}
                        setValue={setValue}
                    />
                  </div>
            
              </Col>
          </Row>
    </div>
  )
}

export default WithDrawalRequest