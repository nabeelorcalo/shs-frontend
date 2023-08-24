import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Collapse } from 'antd';
import ButtonColor from './ButtonColors/ButtonColor'
import SideMenuColor from './SideMenuColors/SideMenuColor'
import SideMenuIconsColor from './SideMenuIconsColors/SideMenuIconsColor'
import LogoUploader from './LogoUploader/LogoUploader'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './CustomisationContent.scss';
import useCustomHook from '../../actionHandler';
import { personalizeColorTheme } from '../../../../config/constants';
import { 
  IconPColorState,
  IconSColorState,
  currentUserState,
  ButtonPrimaryColorState,
  ButtonSecondaryColorState,
  sbColorState,
  sbPreviewColorState,
  OrgLogoState,
  dataLogoState,
  PreviewLogoState
} from '../../../../store';
import {
  Alert,
  ButtonThemePrimary,
  ButtonThemeSecondary,
  Notifications 
} from '../../../../components';
const { Panel } = Collapse;

const InnerData = () => {

  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [loadingUpdateTheme, setLoadingUpdateTheme] = useState(false)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [iconsPColor, setIconsPColor] = useRecoilState(IconPColorState);
  const [iconsSColor, setIconsSColor] = useRecoilState(IconSColorState);
  const [buttonPrimaryColor, setButtonPrimaryColor] = useRecoilState(ButtonPrimaryColorState);
  const [buttonSecondaryColor, setButtonSecondaryColor] = useRecoilState(ButtonSecondaryColorState);
  const [sbColor, setSBColor] = useRecoilState(sbColorState);
  const [sbPreviewColor, setSbPreviewColor] = useRecoilState(sbPreviewColorState);
  const [orgLogo, setOrgLogo] = useRecoilState(OrgLogoState)
  const [dataLogo, setDataLogo] = useRecoilState(dataLogoState)
  const previewLogo = useRecoilValue(PreviewLogoState);
  const { 
    handlePatchRequest
  } = useCustomHook();
  const [alertRevertChanges , setAlertRevertChanges] = useState(false);


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

  const handleUpdateTheme = async (isReset:boolean) => {
    setLoadingUpdateTheme(true)
    const formData = new FormData();
    formData.append('buttonPrimaryColor', isReset ? personalizeColorTheme.defaultBtnPrimColor : buttonPrimaryColor);
    formData.append('buttonSecondaryColor', isReset ? personalizeColorTheme.defaultBtnSecColor : buttonSecondaryColor);
    formData.append('sideMenuIconPrimaryColor', isReset ? personalizeColorTheme.defaultPrimIconColor : iconsPColor);
    formData.append('sideMenuIconSecondaryColor', isReset ? personalizeColorTheme.defaultSecIconColor : iconsSColor);
    formData.append('sideMenuColor', isReset ? personalizeColorTheme.defaultSIdeBarColor : sbColor);
    if(dataLogo !== '') {
      formData.append('logo', isReset ? '' : dataLogo);
    }
    
    const newTheme = {
      buttonPrimaryColor: (isReset ? personalizeColorTheme.defaultBtnPrimColor : buttonPrimaryColor),
      buttonSecondaryColor: (isReset ? personalizeColorTheme.defaultBtnSecColor : buttonSecondaryColor),
      sideMenuIconPrimaryColor: (isReset ? personalizeColorTheme.defaultPrimIconColor : iconsPColor),
      sideMenuIconSecondaryColor: (isReset ? personalizeColorTheme.defaultSecIconColor : iconsSColor),
      sideMenuColor: (isReset ? personalizeColorTheme.defaultSIdeBarColor : sbColor),
    }

    const response = await handlePatchRequest(formData);
    if(!response.error) {
      setCurrentUser({
        ...currentUser,
        company: {
          ...currentUser.company,
          ...newTheme
        }
      });
      setOrgLogo(previewLogo)
      if(isReset) {
        setIconsPColor(personalizeColorTheme.defaultPrimIconColor);
        setIconsSColor(personalizeColorTheme.defaultSecIconColor);
        setButtonPrimaryColor(personalizeColorTheme.defaultBtnPrimColor);
        setButtonSecondaryColor(personalizeColorTheme.defaultBtnSecColor);
        setSBColor(personalizeColorTheme.defaultSIdeBarColor);
        setSbPreviewColor(personalizeColorTheme.defaultSIdeBarColor);
        setDataLogo('');
      }
      setLoadingUpdateTheme(false)
      Notifications({ title: 'Success', description: 'Your changes are saved successfully', type: 'success' })
    } else {
      setLoadingUpdateTheme(false)
    }
  };

  const openAlertRevertChanges = () => {
    setAlertRevertChanges(true);
  };

  const closeAlertRevertChanges = () => {
    setAlertRevertChanges(false)
  };


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className='personalization-accordion'>
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
            <LogoUploader />
          </Panel>
          <Panel header="Button Colors" key="2">
            <ButtonColor />
          </Panel>
          <Panel header="Side Menu Color" key="3">
            <SideMenuColor />
          </Panel>
          <Panel header="Side Menu Icons Color" key="4">
            <SideMenuIconsColor />
          </Panel>
        </Collapse>
        <div className="flex justify-center md:justify-end gap-4 mt-10">
          <ButtonThemeSecondary
            onClick={openAlertRevertChanges}
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
        </div>
      </div>

      <Alert
        state={alertRevertChanges}
        setState={setAlertRevertChanges}
        cancelBtntxt={"Cancel"}
        okBtnFunc={() => handleUpdateTheme(true)}
        okBtntxt={"Revert"}
        children={"Are you sure you want to revert all changes."}
        type={"warning"}
      />
    </>
  )
}

export default InnerData
