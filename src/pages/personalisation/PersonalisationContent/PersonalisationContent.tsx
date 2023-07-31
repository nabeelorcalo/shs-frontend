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
  IconCalendarRemove,
  IconCalendarTick,
  IconChart,
  IconClipboardTick,
  IconCourtHouse,
  IconDashboard,
  IconData,
  IconPeoples,
  IconProfileCircle,
  IconProfileUsers,
  IconTaskSquare,
  IconTimer,
  Logo,
} from "../../../assets/images";
import avatar from "../../../assets/images/header/avatar.svg";
import getUserRoleLable from "../../../helpers/roleLabel";
import { useRecoilState, useRecoilValue } from "recoil";
import { companyLogo, currentUserRoleState, imageState, logoSelector, sbColorState } from "../../../store";
import constants, { personalizeColorTheme } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { CustomTheme } from "../../../theme";
import { Loader, PageHeader } from "../../../components";

const { Content } = Layout;
const PersonalisationContent = () => {
  const role = useRecoilValue(currentUserRoleState);
  const { useToken } = theme;
  const { token } = useToken();
  const { isLoading } = useCustomHook()
  const themeImage = useRecoilValue(logoSelector)
  // const { themeContext } = CustomTheme()
  // const themes = useContext(themeContext)
  const [imageUrl, setImageUrl] = useRecoilState<any>(imageState)
  const [sideBarColor, setSideBarColor] = useState(token.colorPrimary);
  const [buttonPrimaryColor, setButtonPrimaryColor] = useState(token.colorPrimary);
  const [buttonSecondaryColor, setButtonSecondaryColor] = useState(token.colorBorderSecondary);
  const sbColor = useRecoilValue(sbColorState)
  const { pIconsColor, sIconsColor } = useCustomHook()

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
                <AppHeader imageUrl={imageUrl} />
                <Layout>
                  <Row>
                    <Col xs={0} md={12} xl={5} lg={9}>
                      <div
                        className={`h-full`}
                        style={{ backgroundColor: sideBarColor? sideBarColor : '#363565' }}
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
                            <IconDashboard /> Dashboard
                          </li>
                        </ul>
                        <ul className="white-color pl-3  list-none">
                          <p className="side-bar-text pt-[0.5rem] pb-[0.5rem] text-[7.68128px] font-normal pl-1">
                            Recruitment
                          </p>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal flex items-center gap-x-1">
                            <IconPeoples className="mr-1"/> Candidates
                          </li>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                            <IconClipboardTick className="mr-1"/> Offer Letter
                          </li>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                            <IconTaskSquare className="mr-1"/> Contracts
                          </li>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                            <IconProfileUsers className="mr-1"/> Interns
                          </li>
                          <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                            <IconProfileCircle className="mr-1"/> Managers
                          </li>
                        </ul>
                        <ul className="white-color pl-3  list-none">
                          <p className="side-bar-text pt-[0.5rem] pb-[0.5rem] text-[7.68128px] font-normal p-1">
                            Organisation
                          </p>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <IconCourtHouse className="mr-1"/> Universities
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <IconData className="mr-1"/> Structure
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <IconCalendarTick className="mr-1"/> Attendance
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <IconCalendarRemove className="mr-1"/> Leaves
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <IconTimer className="mr-1"/> Timesheet
                          </li>
                          <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                            <IconChart className="mr-1"/> Documents
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col xs={24} md={12} xl={18} lg={15}>
                      <Content className="ant-layout-content-preview">
                        <InnerData
                          buttonPrimaryColor={buttonPrimaryColor}
                          buttonSecondaryColor={buttonSecondaryColor}
                        />
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
