import React, { useState } from 'react'
import { Col, Row, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { IconPColorState, IconSColorState } from '../../../../../store'
import { personalizeColorTheme } from '../../../../../config/constants'

function SideMenuIconsColor() {
  const [PIconColor, setPIconColor] = useRecoilState<any>(IconPColorState);
  const [SIconColor, setSIconColor] = useRecoilState<any>(IconSColorState);
  const [primaryColor, setPrimaryColor] = useState(personalizeColorTheme.defaultPrimIconColor);
  const [secondaryColor, setSecondaryColor] = useState(personalizeColorTheme?.defaultSecIconColor);
  const resetPIconColors = useResetRecoilState(IconPColorState);
  const resetSIconColors = useResetRecoilState(IconSColorState);
console.log('PIconColor::: ', PIconColor)
  const handleColorChangePrimary = (event: any) => {
    const value = event.target.value
    console.log(value)
    setPIconColor((prev: any) => {
      return {
        ...prev,
        previewColor: value
      }
    })
  }

  const handleRefreshPrimary = () => {
    resetPIconColors();
    resetSIconColors();
    // setPIconColor(personalizeColorTheme.defaultPrimIconColor);

    // setPIconColor((prev: any) => {
    //   return{
    //     ...prev,
    //     previewColor: ''
    //   }
    // })
  }

  const handleColorChangeSecondary = (event: any) => {
    const value = event.target.value
    setSIconColor(value)
  }

  const handleRefreshSecondary = () => {
    setSIconColor(personalizeColorTheme?.defaultSecIconColor)
  }


  return (
    <div>
      <Row gutter={[20, 10]}>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <h5 className="text-success-placeholder-color">Primary</h5>
        </Col>
        <Col xxl={4} xl={4} lg={2} md={12} xs={24} >
          <input
            type="color"
            value={PIconColor.previewColor}
            onChange={handleColorChangePrimary}
            id="primary_color"
            className="field-radio"
          />
        </Col>
        <Col xxl={15} xl={20} lg={8} md={12} xs={24} >
          <input
            type="text"
            value={PIconColor.preview}
            onChange={handleColorChangePrimary}
            className="h-10 border-none sky-blue-color-bg rounded-md  md:pl-2"
          />
        </Col>
        <Col xxl={4} xl={8} lg={2} md={12} xs={24}>
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
            value={SIconColor.previewColor}
            onChange={handleColorChangeSecondary}
            id="primary_color"
            className="field-radio"
          />
        </Col>
        <Col xxl={15} xl={20} lg={8} md={12} xs={24} >
          <input
            type="text"
            value={SIconColor.previewColor}
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