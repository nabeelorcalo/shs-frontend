import React, { useState, useEffect } from 'react'
import { Col, Divider, Row } from 'antd'
import './CustomisationContent.scss'
import { BoxWrapper } from '../../../../components/BoxWrapper';
import AppFooter from '../../../../layout/components/footer'
import { Layout } from 'antd'
import ButtonColor from './ButtonColors/ButtonColor'
import SideMenuColor from './SideMenuColors/SideMenuColor'
import SideMenuIconsColor from './SideMenuIconsColors/SideMenuIconsColor'
import LogoUploader from './LogoUploader/LogoUploader'
const { Content } = Layout
import { Button } from '../../../../components/Button'

const InnerData = (
  { imageUrl,
    setImageUrl,
    sideBarColor,
    setSideBarColor,
    buttonPrimaryColor,
    setButtonPrimaryColor,
    buttonSecondaryColor,
    setButtonSecondaryColor
  }: any) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [collapsed, setCollapsed] = useState(false)

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => { }, [])

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const collapsedSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div>
      <LogoUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <ButtonColor
        buttonPrimaryColor={buttonPrimaryColor}
        setButtonPrimaryColor={setButtonPrimaryColor}
        buttonSecondaryColor={buttonSecondaryColor}
        setButtonSecondaryColor={setButtonSecondaryColor}
      />
      <SideMenuColor sideBarColor={sideBarColor} setSideBarColor={setSideBarColor} />
      <SideMenuIconsColor />
      <div className="flex justify-end gap-4 px-6 mt-10">
        <Button
          className='min-w-20 w-20'
          label="Reset"
          onClick={() => { }}
          type="default"
          size="small"
        />
        <Button
          className='min-w-20 w-20 text-success-bg-color'
          label="Apply"
          onClick={() => { }}
          type="primary"
          size="small"
        />
      </div>
    </div>
  )
}

export default InnerData
