import React, { useState } from 'react'
import { Col, Row, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useRecoilState } from 'recoil'
import { IconPColorState, IconSColorState } from '../../../../../store'

function SideMenuIconsColor() {
  const [PIconColor, setPIconColor] = useRecoilState<any>(IconPColorState)
  const [SIconColor, setSIconColor] = useRecoilState<any>(IconSColorState)
  const [primaryColor, setPrimaryColor] = useState('#000000')

  const handleColorChangePrimary = (event: any) => {
    const value = event.target.value
    setPIconColor(value)
    setPrimaryColor(value)
  }

  const handleRefreshPrimary = () => {
    setPIconColor('#000000')
  }
  const [secondaryColor, setSecondaryColor] = useState('#000000')

  const handleColorChangeSecondary = (event: any) => {
    const value = event.target.value
    setSIconColor(value)
    setSecondaryColor(value)
  }

  const handleRefreshSecondary = () => {
    setSIconColor('#000000')
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
            value={PIconColor}
            onChange={handleColorChangePrimary}
            id="primary_color"
            className="field-radio"
          />
        </Col>
        <Col xxl={15} xl={20} lg={8} md={12} xs={24} >
          <input
            type="text"
            value={PIconColor}
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
            value={SIconColor}
            onChange={handleColorChangeSecondary}
            id="primary_color"
            className="field-radio"
          />
        </Col>
        <Col xxl={15} xl={20} lg={8} md={12} xs={24} >
          <input
            type="text"
            value={SIconColor}
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