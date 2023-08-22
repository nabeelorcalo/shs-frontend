import React, { useState, useEffect, useContext } from "react";
import { Avatar, Col, Divider, Menu, Row, Typography, theme } from "antd";
import "./PersonalisationContent.scss";
import { BoxWrapper } from "../../../components/BoxWrapper";
import AppHeader from "./Header";
import AppFooter from "./Footer";
import InnerData from "./InnerData";
import CustomisationContent from "./CustomisationContent";
import { Layout } from "antd";
import {
  PIconDashboard,
  PIconCalendarRemove,
  PIconCalendarTick,
  PIconChart,
  PIconClipboardTick,
  PIconCourtHouse,
  PIconData,
  PIconPeoples,
  PIconProfileCircle,
  PIconProfileUsers,
  PIconTaskSquare,
  PIconTimer,
  Logo,
} from "../../../assets/images";
import avatar from "../../../assets/images/header/avatar.svg";
import getUserRoleLable from "../../../helpers/roleLabel";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, companyLogo, currentUserRoleState, imageState, logoSelector, sbColorState, IconSColorState, IconPColorState, sbPreviewColorState} from "../../../store";
import { personalizeColorTheme } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { CustomTheme } from "../../../theme";
import { PageHeader } from "../../../components";

const { Content } = Layout;
const PersonalisationContent = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const role = useRecoilValue(currentUserRoleState);
  const currentUser = useRecoilValue(currentUserState)
  const { useToken } = theme;
  const { token } = useToken();
  const { isLoading } = useCustomHook()
  const themeImage = useRecoilValue(logoSelector)
  // const { themeContext } = CustomTheme()
  // const themes = useContext(themeContext)
  const [imageUrl, setImageUrl] = useRecoilState<any>(imageState)
  const [sideBarColor, setSideBarColor] = useState(currentUser?.company?.sideMenuColor ?? personalizeColorTheme.defaultSIdeBarColor);
  const [buttonPrimaryColor, setButtonPrimaryColor] = useState(token.colorPrimary);
  const [buttonSecondaryColor, setButtonSecondaryColor] = useState(token.colorBorderSecondary);
  const iconsPColor = useRecoilValue(IconPColorState);
  const iconsSColor = useRecoilValue(IconSColorState);
  const sbPreviewColor = useRecoilValue(sbPreviewColorState);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="personalisation-content">
      <Row gutter={[0, 6]}>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <PageHeader title= 'Personalisation' bordered />
        </Col>
      </Row>
      <Row className="second_row" gutter={[15, 15]}>
        <Col xs={24} md={24} xl={18} xxl={18}>
          <BoxWrapper className="h-[100vh] xl:h-[82vh]">
            <h4 className="font-medium text-xl pb-3">Preview</h4>
            <div className="innner-screen p-1">
              <Layout className="sidebar">
                <AppHeader />
                <Layout>
                  <Row>
                    <Col xs={0} md={12} xl={5} lg={9}>
                      <div
                        className={`h-full`}
                        style={{ backgroundColor: sbPreviewColor? sbPreviewColor : '#363565' }}
                      >
                        <div className="sidebar-user-profile">
                          <Avatar size={48} src={avatar} />
                          <div className="sidebar-user-profile-content">
                            <Typography.Title level={3}>
                              Maria Sanoid
                            </Typography.Title>
                            <div className="sidebar-user-profile-role">
                              {getUserRoleLable(role)}
                            </div>
                          </div>
                        </div>
                        <ul className="white-color pl-7  list-none">
                          <li className="mt-4 mb-[0.7rem] text-[8.77861px] font-normal">
                            <PIconDashboard fillP={iconsPColor} fillS={iconsSColor} className="mr-1" /> Dashboard
                          </li>
                        </ul>
                        <ul className="white-color pl-3  list-none">
                          <p className="side-bar-text pt-[0.5rem] pb-[0.5rem] text-[7.68128px] font-normal pl-1">
                            Recruitment
                          </p>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal flex items-center gap-x-1">
                            <PIconPeoples fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Candidates
                          </li>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                            <PIconClipboardTick fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Offer Letter
                          </li>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                            <PIconTaskSquare fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Contracts
                          </li>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                            <PIconProfileUsers fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Interns
                          </li>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                            <PIconProfileCircle fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Managers
                          </li>
                        </ul>
                        <ul className="white-color pl-3  list-none">
                          <p className="side-bar-text pt-[0.5rem] pb-[0.5rem] text-[7.68128px] font-normal p-1">
                            Organisation
                          </p>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <PIconCourtHouse fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Universities
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <PIconData fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Structure
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <PIconCalendarTick fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Attendance
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <PIconCalendarRemove fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Leaves
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <PIconTimer fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Timesheet
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <PIconChart fillP={iconsPColor} fillS={iconsSColor} className="mr-1"/> Documents
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col xs={24} md={12} xl={18} lg={15}>
                      <Content className="ant-layout-content-preview">
                        <InnerData />
                      </Content>
                    </Col>
                  </Row>
                </Layout>
                <AppFooter />
              </Layout>
            </div>
          </BoxWrapper>
        </Col>
        <Col xs={24} md={24} xl={6} xxl={6}>
          <BoxWrapper className="left-box h-[100vh] xl:h-[82vh]  overflow-x-scroll">
            <CustomisationContent
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              sideBarColor={sideBarColor}
              setSideBarColor={setSideBarColor}
              buttonPrimaryColor={buttonPrimaryColor}
              setButtonPrimaryColor={setButtonPrimaryColor}
              buttonSecondaryColor={buttonSecondaryColor}
              setButtonSecondaryColor={setButtonSecondaryColor}
            />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalisationContent;
