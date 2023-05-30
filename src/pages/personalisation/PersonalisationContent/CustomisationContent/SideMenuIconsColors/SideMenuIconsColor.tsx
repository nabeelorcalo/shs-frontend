import React, { useState } from 'react'
import { Col, Row, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

function SideMenuIconsColor() {
  const [primaryColor, setPrimaryColor] = useState('#000000')

  const handleColorChangePrimary = (event: any) => {
    setPrimaryColor(event.target.value)
  }

  const handleRefreshPrimary = () => {
    setPrimaryColor('#000000')
  }
  const [secondaryColor, setSecondaryColor] = useState('#000000')

  const handleColorChangeSecondary = (event: any) => {
    setSecondaryColor(event.target.value)
  }

  const handleRefreshSecondary = () => {
    setSecondaryColor('#000000')
  }
  return (
    <div >
        <Row gutter={[20, 10]}>
          <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
            <h5 className="text-success-placeholder-color">Primary</h5>
          </Col>
          <Col xxl={4} xl={4} lg={2} md={12} xs={24} >
            <input
              type="color"
              value={primaryColor}
              onChange={handleColorChangePrimary}
              id="primary_color"
              className="field-radio"
            />
          </Col>
          <Col xxl={15} xl={20} lg={8} md={12} xs={24} >
            <input
              type="text"
              value={primaryColor}
              onChange={handleColorChangePrimary}
              className="h-10 border-none sky-blue-color-bg rounded-md  md:pl-2"
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
        <Row gutter={[15, 15]}>
          <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
            <h5 className="text-success-placeholder-color">Secondary</h5>
          </Col>
          <Col xxl={4} xl={4} lg={2} md={12} xs={24} >
            <input
              type="color"
              value={secondaryColor}
              onChange={handleColorChangeSecondary}
              id="primary_color"
              className="field-radio"
            />
          </Col>
          <Col xxl={15} xl={20} lg={8} md={12} xs={24} >
            <input
              type="text"
              value={secondaryColor}
              onChange={handleColorChangeSecondary}
              className="h-10 border-none sky-blue-color-bg rounded-md md:pl-2"
            />
          </Col>
          <Col xxl={4} xl={8} lg={2} md={12} xs={24} >
            <Button
              className="min-h-10 h-10 sky-blue-color-bg p-0 shadow-none"
              style={{ minWidth: "0px" }}
              icon={<ReloadOutlined />}
              onClick={handleRefreshSecondary}
              type="primary"
            />
          </Col>
        </Row>
    </div>
  )
}

export default SideMenuIconsColor