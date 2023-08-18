import React, { useState, useEffect, useContext } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Collapse } from 'antd';
import { Button } from '../../../../components/Button'
import ButtonColor from './ButtonColors/ButtonColor'
import SideMenuColor from './SideMenuColors/SideMenuColor'
import SideMenuIconsColor from './SideMenuIconsColors/SideMenuIconsColor'
import LogoUploader from './LogoUploader/LogoUploader'
import { MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { 
  IconPColorState,
  IconSColorState,
  currentUserState,
  ButtonPrimaryColorState,
  ButtonSecondaryColorState
} from '../../../../store';
import './CustomisationContent.scss';
import useCustomHook from '../../actionHandler';
import { CustomTheme } from '../../../../theme';
import UploadDocument from '../../../../components/UploadDocument';
import OrcaloLogo from '../../../../assets/images/Personlization/orcalologo.svg'
import { personalizeColorTheme } from '../../../../config/constants';
import { ButtonThemePrimary, ButtonThemeSecondary } from '../../../../components';

const { Panel } = Collapse;

const InnerData = (
  { imageUrl,
    setImageUrl,
    sideBarColor,
    setSideBarColor,
  }: any) => {

  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [loadingUpdateTheme, setLoadingUpdateTheme] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [files, setFiles] = useState<any>(null);
  const { themeContext } = CustomTheme();
  const theme = useContext(themeContext);
  const [iconsPColor, setIconsPColor] = useRecoilState(IconPColorState);
  const [iconsSColor, setIconsSColor] = useRecoilState(IconSColorState);
  const [buttonPrimaryColor, setButtonPrimaryColor] = useRecoilState(ButtonPrimaryColorState);
  const [buttonSecondaryColor, setButtonSecondaryColor] = useRecoilState(ButtonSecondaryColorState);
  const { 
    personalizePatch,
    sbColor,
    sColor,
    pColor,
    handlePatchRequest
  } = useCustomHook();
console.log('currentUser::: ', currentUser)


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {}, [])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const panelStyle = {
    marginBottom: 12,
    background: "",
    borderRadius: "",
    borderBottom: "1px solid #D9D9D9",
    color: "#4E4B66",
    fontSize: "20px",
    fontWeight: 500,
  };
  
  const collapsedSidebar = () => {
    setCollapsed(!collapsed)
  }

  const applyTheme = (isReset?: boolean) => {
    const body: any = {
      logo: isReset ? OrcaloLogo : imageUrl && imageUrl?.files[0],
      buttonPrimaryColor: (isReset ? personalizeColorTheme.defaultBtnPrimColor : pColor),
      buttonSecondaryColor: (isReset ? personalizeColorTheme.defaultBtnSecColor : sColor),
      sideMenuColor: (isReset ? personalizeColorTheme.defaultSIdeBarColor : sbColor),
      sideMenuIconPrimaryColor: (isReset ? personalizeColorTheme.defaultPrimIconColor : iconsPColor),
      sideMenuIconSecondaryColor: (isReset ? personalizeColorTheme.defaultSecIconColor : iconsSColor),
    };
    setCurrentUser({
      ...currentUser,
      company: {
        ...currentUser.company,
        buttonPrimaryColor: (isReset ? personalizeColorTheme.defaultBtnPrimColor : pColor),
        buttonSecondaryColor: (isReset ? personalizeColorTheme.defaultBtnSecColor : sColor),
        sideMenuColor: (isReset ? personalizeColorTheme.defaultSIdeBarColor : sbColor),
        sideMenuIconPrimaryColor: (isReset ? personalizeColorTheme.defaultPrimIconColor : iconsPColor),
        sideMenuIconSecondaryColor: (isReset ? personalizeColorTheme.defaultSecIconColor : iconsSColor),
      }
    });
    if(isReset) {
      setIconsPColor(personalizeColorTheme.defaultPrimIconColor);
      setIconsSColor(personalizeColorTheme.defaultSecIconColor);
    }

    // Update theme in db
    const digivautUploadFile = new FormData();
    Object.keys(body).map((a: any) => {
      digivautUploadFile.append(a, body['logo']);
    });
    personalizePatch(body);
  }

  const handleUpdateTheme = async (isReset:boolean) => {
    setLoadingUpdateTheme(true)
    const newTheme = {
      buttonPrimaryColor: (isReset ? personalizeColorTheme.defaultBtnPrimColor : buttonPrimaryColor),
      buttonSecondaryColor: (isReset ? personalizeColorTheme.defaultBtnSecColor : buttonSecondaryColor),
      sideMenuIconPrimaryColor: (isReset ? personalizeColorTheme.defaultPrimIconColor : iconsPColor),
      sideMenuIconSecondaryColor: (isReset ? personalizeColorTheme.defaultSecIconColor : iconsSColor),
    }
    const response = await handlePatchRequest(newTheme)
    if(!response.error) {
      setCurrentUser({
        ...currentUser,
        company: {
          ...currentUser.company,
          ...newTheme
        }
      });
      if(isReset) {
        setIconsPColor(personalizeColorTheme.defaultPrimIconColor);
        setIconsSColor(personalizeColorTheme.defaultSecIconColor);
        setButtonPrimaryColor(personalizeColorTheme.defaultBtnPrimColor);
        setButtonSecondaryColor(personalizeColorTheme.defaultBtnSecColor);
      }
      setLoadingUpdateTheme(false)
    } else {
      setLoadingUpdateTheme(false)
    }
  };


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
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
          {/* <LogoUploader imageUrl={imageUrl} setImageUrl={setImageUrl} /> */}
          <UploadDocument files={imageUrl} setFiles={setImageUrl} />
        </Panel>
        <Panel header="Button Colors" key="2">
          <ButtonColor />
        </Panel>
        <Panel header="Side Menu Color" key="3">
          <SideMenuColor sideBarColor={sbColor} setSideBarColor={setSideBarColor} />
        </Panel>
        <Panel header="Side Menu Icons Color" key="4">
          <SideMenuIconsColor />
        </Panel>
      </Collapse>
      <div className="flex justify-center md:justify-end gap-4 px-6 mt-10">
        <ButtonThemeSecondary
          onClick={() => handleUpdateTheme(true)}
          loading={loadingUpdateTheme}
        >
          Reset
        </ButtonThemeSecondary>
        <ButtonThemePrimary
          onClick={() => handleUpdateTheme(false)}
          loading={loadingUpdateTheme}
        >
          Apply
        </ButtonThemePrimary>
        {/* <Button
          className='min-w-20 w-50'
          label="Reset"
          onClick={() => handleUpdateTheme(true)}
          type="default"
          size="large"
          loading={loadingUpdateTheme}
        /> */}
        {/* <Button
          className='min-w-20 w-20 text-success-bg-color'
          label="Apply"
          onClick={() => handleUpdateTheme(false)}
          type="primary"
          size="large"
          loading={loadingUpdateTheme}
        /> */}
      </div>
    </div>
  )
}

export default InnerData
