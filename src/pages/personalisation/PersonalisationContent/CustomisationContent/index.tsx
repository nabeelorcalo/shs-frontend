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
import { Collapse } from 'antd';
import { MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { themeState } from '../../../../store';
import { useRecoilState } from 'recoil';

const { Panel } = Collapse;

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

  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);

  

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => { }, [])

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const collapsedSidebar = () => {
    setCollapsed(!collapsed)
  }
  const panelStyle = {
    marginBottom: 12,
    background: "",
    borderRadius: "",
    borderBottom: "1px solid #D9D9D9",
    color: "#4E4B66",
    fontSize: "20px",
    fontWeight: 500,
  };

  return (
    <div>
      <Collapse
        size="large"
        bordered={false}
        defaultActiveKey={['1', '2', '3', '4']}
        expandIcon=
        {
          ({ isActive }) => isActive ?
            <MinusCircleOutlined className="accordionIcon" /> :
            <PlusCircleOutlined className="accordionIcon" rotate={isActive ? 90 : 0} />
        }
        style={panelStyle}
      >
        <Panel header="Company Logo" key="1">
          <LogoUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </Panel>
        <Panel header="Button Colors" key="2">
          <ButtonColor
            buttonPrimaryColor={buttonPrimaryColor}
            setButtonPrimaryColor={setButtonPrimaryColor}
            buttonSecondaryColor={buttonSecondaryColor}
            setButtonSecondaryColor={setButtonSecondaryColor}
          />
        </Panel>
        <Panel header="Side Menu Color" key="3">
          <SideMenuColor sideBarColor={sideBarColor} setSideBarColor={setSideBarColor} />
        </Panel>
        <Panel header="Side Menu Icons Color" key="4">
          <SideMenuIconsColor />
        </Panel>
      </Collapse>
      <div className="flex justify-center md:justify-end gap-4 px-6 mt-10">
        <Button
          className='min-w-20 w-50'
          label="Reset"
          onClick={() => {setCurrentTheme({...currentTheme, colorPrimary:'#363565'}) }}
          type="default"
          size="large"
        />
        <Button
          className='min-w-20 w-20 text-success-bg-color p-'
          label="Apply"
          onClick={() => setCurrentTheme({...currentTheme, colorPrimary:sideBarColor})}
          type="primary"
          size="large"
        />
      </div>
    </div>
  )
}

export default InnerData
