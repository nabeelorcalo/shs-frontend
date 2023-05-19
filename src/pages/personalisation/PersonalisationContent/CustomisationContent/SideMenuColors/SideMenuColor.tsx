import React, { useState } from 'react'
import { Col, Divider, Row, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

function SideMenuColor({ sideBarColor, setSideBarColor }: any) {
  const handleColorChangePrimary = (event: any) => {
    setSideBarColor(event.target.value)
  }

  const handleRefreshPrimary = () => {
    setSideBarColor('#000000')
  }

  return (
    <div>
      <Row gutter={[15, 15]}>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <h5 className="text-success-placeholder-color">Primary</h5>
        </Col>
        <Col xxl={4} xl={4} lg={2} md={12} xs={24}>
          <input
            type="color"
            value={sideBarColor}
            onChange={handleColorChangePrimary}
            id="primary_color"
            className="field-radio"
          />
        </Col>
        <Col xxl={15} xl={20} lg={8} md={12} xs={24} >
          <input
            type="text"
            value={sideBarColor}
            onChange={handleColorChangePrimary}
            className="h-10 border-none sky-blue-color-bg rounded-md md:pl-2"
          />
        </Col>
        <Col xxl={4} xl={8} lg={2} md={12} xs={24} >
          <Button
            className="h-10 sky-blue-color-bg p-0 shadow-none"
            style={{ minWidth: "0px" }}
            icon={<ReloadOutlined />}
            onClick={handleRefreshPrimary}
            type="primary"
          />
        </Col>
      </Row>
    </div>
  )
}

export default SideMenuColor