import React, { useState, useEffect, useContext } from 'react'
import { useRecoilState } from 'recoil';
import { Collapse } from 'antd';
import { Button } from '../../../../components/Button'
import ButtonColor from './ButtonColors/ButtonColor'
import SideMenuColor from './SideMenuColors/SideMenuColor'
import SideMenuIconsColor from './SideMenuIconsColors/SideMenuIconsColor'
import LogoUploader from './LogoUploader/LogoUploader'
import { MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { IconPColorState, IconSColorState, currentUserState, pColorState, sColorState, sbColorState, themeState } from '../../../../store';
import './CustomisationContent.scss';
import useCustomHook from '../../actionHandler';
import { CustomTheme } from '../../../../personalizeTheme';
import UploadDocument from '../../../../components/UploadDocument';
import OrcaloLogo from '../../../../assets/images/Personlization/orcalologo.svg'

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
  console.log(imageUrl, "files");

  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [files, setFiles] = useState<any>(null)
  const { themeContext } = CustomTheme()
  const theme = useContext(themeContext)

  const { personalizePatch, sIconsColor,
    pIconsColor,
    sbColor,
    sColor,
    pColor,
  } = useCustomHook();

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => { }, [])

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

  // console.log(imageUrl?.files[0], "imageUrlimageUrlimageUrl");
  // console.log(typeof imageUrl, "imageUrlimageUrlimageUrl join");
  console.log("sbColorv", sbColor);
  console.log("imageUrl", imageUrl);

  const applyTheme = (isReset?: boolean) => {
    const body: any = {
      logo: isReset ? OrcaloLogo : imageUrl && imageUrl?.files[0], // add logo atom into store
      buttonPrimaryColor: (isReset ? "#353665" : pColor),
      buttonSecondaryColor: (isReset ? "#4a9d77" : sColor),
      sideMenuColor: (isReset ? "#363565" : sbColor),
      sideMenuIconPrimaryColor: (isReset ? "#000000" : pIconsColor),
      sideMenuIconSecondaryColor: (isReset ? "#000000" : sIconsColor),
    };
    console.log(body, "bodydbody");
    console.log(files, "filesdata");
    console.log("isReset", isReset);

    console.log(`isReset ? "#363565" : pColor`, isReset ? "#363565" : pColor);

    setCurrentUser({
      ...currentUser,
      company: {
        ...currentUser.company,
        buttonPrimaryColor: (isReset ? "#363565" : pColor),
        buttonSecondaryColor: (isReset ? "#4a9d77" : sColor),
        sideMenuColor: (isReset ? "#363565" : sbColor),
        sideMenuIconPrimaryColor: (isReset ? "#000000" : pIconsColor),
        sideMenuIconSecondaryColor: (isReset ? "#000000" : sIconsColor),
      }
    });

    // Update theme in db
    const digivautUploadFile = new FormData();
    Object.keys(body).map((a: any) => {
      digivautUploadFile.append(a, body['logo']);
      console.log(a, "aaaaaaaaaaaa");
    });
    personalizePatch(body);
  }
  console.log(imageUrl, "imageUrl");
  console.log(typeof imageUrl, "imageUrl");

  // useEffect(()=>{

  // },[imageUrl])

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
          <ButtonColor
            buttonPrimaryColor={buttonPrimaryColor}
            setButtonPrimaryColor={setButtonPrimaryColor}
            buttonSecondaryColor={buttonSecondaryColor}
            setButtonSecondaryColor={setButtonSecondaryColor}
          />
        </Panel>
        <Panel header="Side Menu Color" key="3">
          <SideMenuColor sideBarColor={sbColor} setSideBarColor={setSideBarColor} />
        </Panel>
        <Panel header="Side Menu Icons Color" key="4">
          <SideMenuIconsColor />
        </Panel>
      </Collapse>
      <div className="flex justify-center md:justify-end gap-4 px-6 mt-10">
        <Button
          className='min-w-20 w-50'
          label="Reset"
          onClick={() => applyTheme(true)}
          type="default"
          size="large"
        />
        <Button
          className='min-w-20 w-20 text-success-bg-color'

          label="Apply"
          onClick={() => applyTheme(false)}
          type="primary"
          size="large"
        />
      </div>
    </div>
  )
}

export default InnerData
