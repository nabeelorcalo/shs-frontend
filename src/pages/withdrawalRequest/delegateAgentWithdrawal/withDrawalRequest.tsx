import React, { useState } from 'react'
import { Col, Row } from 'antd'
import PageHeader from '../../../components/PageHeader'

const WithDrawalRequest = () => {
    const [value, setValue] = useState("");
  return (
      <div className='delegate-With-Drawal-Request'>
          <PageHeader title="Withdrawal Request" bordered={true} actions={true} />

          <Row>
              <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
              </Col>
</Row>
    </div>
  )
}

export default WithDrawalRequest