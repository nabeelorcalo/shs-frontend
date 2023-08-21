import { useState } from 'react'
import { Col, Row, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IconPColorState, IconSColorState, currentUserState } from '../../../../../store'

function SideMenuIconsColor() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [iconsPColor, setIconsPColor] = useRecoilState(IconPColorState);
  const [iconsSColor, setIconsSColor] = useRecoilState(IconSColorState);
  const currentUser = useRecoilValue(currentUserState)


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleChangeIconColorPrimary = (event: any) => {
    const value = event.target.value
    setIconsPColor(value)
  }

  const handleRefreshIconColorPrimary = () => {
    setIconsPColor(currentUser?.company?.sideMenuIconPrimaryColor)
  }

  const handleChangeIconColorSecondary = (event: any) => {
    const value = event.target.value
    setIconsSColor(value)
  }

  const handleRefreshIconColorSecondary = () => {
    setIconsSColor(currentUser?.company?.sideMenuIconSecondaryColor);
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div>
      <Row gutter={[20, 10]}>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <h5 className="text-success-placeholder-color">Primary</h5>
        </Col>
        <Col xxl={4} xl={4} lg={2} md={12} xs={24} >
          <input
            type="color"
            value={iconsPColor}
            onChange={handleChangeIconColorPrimary}
            id="primary_color"
            className="field-radio"
          />
        </Col>
        <Col xxl={15} xl={20} lg={8} md={12} xs={24} >
          <input
            type="text"
            value={iconsPColor}
            onChange={handleChangeIconColorPrimary}
            className="h-10 border-none sky-blue-color-bg rounded-md  md:pl-2"
          />
        </Col>
        <Col xxl={4} xl={8} lg={2} md={12} xs={24}>
          <Button
            className="h-10 sky-blue-color-bg p-0 shadow-none"
            style={{ minWidth: "0px" }}
            icon={<ReloadOutlined />}
            onClick={handleRefreshIconColorPrimary}
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
            value={iconsSColor}
            onChange={handleChangeIconColorSecondary}
            id="primary_color"
            className="field-radio"
          />
        </Col>
        <Col xxl={15} xl={20} lg={8} md={12} xs={24} >
          <input
            type="text"
            value={iconsSColor}
            onChange={handleChangeIconColorSecondary}
            className="h-10 border-none sky-blue-color-bg rounded-md md:pl-2"
          />
        </Col>
        <Col xxl={4} xl={8} lg={2} md={12} xs={24} >
          <Button
            className="min-h-10 h-10 sky-blue-color-bg p-0 shadow-none"
            style={{ minWidth: "0px" }}
            icon={<ReloadOutlined />}
            onClick={handleRefreshIconColorSecondary}
            type="primary"
          />
        </Col>
      </Row>
    </div>
  )
}

export default SideMenuIconsColor