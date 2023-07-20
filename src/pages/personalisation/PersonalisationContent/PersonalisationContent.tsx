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
import constants from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { CustomTheme } from "../../../personalizeTheme";
import { Loader } from "../../../components";

const { Content } = Layout;

const PersonalisationContent = () => {
  const role = useRecoilValue(currentUserRoleState);
  const { useToken } = theme;
  const { token } = useToken();
  const { isLoading } = useCustomHook()
  const themeImage = useRecoilValue(logoSelector)
  const { themeContext } = CustomTheme()
  const themes = useContext(themeContext)
  // console.log(themes.image, "themes");
  console.log(isLoading, "isLoading");

  const [imageUrl, setImageUrl] = useRecoilState<any>(imageState)
  // console.log(imageUrl, "imageUrlimageUrlimageUrl");
  // console.log(typeof imageUrl, "imageUrlimageUrlimageUrl join");

  // const myImg = `${constants.MEDIA_URL}/${themeImage?.mediaId}.${themeImage?.metaData?.extension}`

  const [sideBarColor, setSideBarColor] = useState(token.colorPrimary);
  const [buttonPrimaryColor, setButtonPrimaryColor] = useState(token.colorPrimary);
  const [buttonSecondaryColor, setButtonSecondaryColor] = useState(token.colorBorderSecondary);
  const sbColor = useRecoilValue(sbColorState)


  return (
    <div className="personalisation-content">
      <Row gutter={[0, 6]}>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <div className="personalisation-content-title">Personalisation</div>
        </Col>
        <Divider />
      </Row>
      <Row className="second_row" gutter={[15, 15]}>
        <Col xs={24} md={24} xl={18} xxl={18}>
          {
            isLoading ? <Loader /> :
              <BoxWrapper className="h-[100vh] xl:h-[82vh]">
                <h4 className="font-medium text-xl pb-1 pt-1">Preview</h4>
                <div className="innner-screen p-1">
                  <Layout className="sidebar">
                    <div>
                      <AppHeader imageUrl={imageUrl} />
                    </div>
                    <Layout>
                      <Row>
                        <Col xs={0} md={12} xl={6} lg={9}>
                          <div
                            className={`h-full`}
                            style={{ backgroundColor: sbColor ? sbColor : '#363565' }}
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
                            <ul className="white-color pl-4  list-none">
                              <li className="mt-4 mb-[0.7rem] text-[8.77861px] font-normal">
                                <IconDashboard /> Dashboard
                              </li>
                            </ul>
                            <ul className="white-color pl-4  list-none">
                              <p className="side-bar-text pt-[0.5rem] pb-[0.5rem] text-[7.68128px] font-normal">
                                People
                              </p>
                              <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                                <IconPeoples /> Candidates
                              </li>
                              <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                                <IconClipboardTick /> Offer Letter
                              </li>
                              <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                                <IconTaskSquare /> Contracts
                              </li>
                              <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                                <IconProfileUsers /> Interns
                              </li>
                              <li className="mt-1 mb-[0.7rem] ml-4 text-[8.77861px] font-normal">
                                <IconProfileCircle /> Managers
                              </li>
                            </ul>
                            <ul className="white-color pl-3  list-none">
                              <p className="side-bar-text pt-[0.5rem] pb-[0.5rem] text-[7.68128px] font-normal">
                                Organisation
                              </p>
                              <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                                <IconCourtHouse /> Universities
                              </li>
                              <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                                <IconData /> Structure
                              </li>
                              <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                                {" "}
                                <IconCalendarTick /> Attendance
                              </li>
                              <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                                <IconCalendarRemove /> Leaves
                              </li>
                              <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                                <IconTimer /> Timesheet
                              </li>
                              <li className="mt-1 mb-3 ml-4 text-[8.77861px] font-normal">
                                <IconChart /> Documents
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
          }
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
