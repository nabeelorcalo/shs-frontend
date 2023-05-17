import React, { useState, useEffect } from "react";
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
import constants from "../../../config/constants";
const { Content } = Layout;

const PersonalisationContent = () => {
  const { useToken } = theme;
  const { token } = useToken();
  const [imageUrl, setImageUrl] = useState<string>();
  const [sideBarColor, setSideBarColor] = useState(token.colorPrimary);
  const [buttonPrimaryColor, setButtonPrimaryColor] = useState(
    token.colorPrimary
  );
  const [buttonSecondaryColor, setButtonSecondaryColor] = useState(
    token.colorBorderSecondary
  );

  return (
    <div className="personalisation-content">
      <Row gutter={[0, 6]}>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <div className="personalisation-content-title">Personalisation</div>
        </Col>
        <Divider />
      </Row>
      <Row className="second_row" gutter={[15, 15]}>
        <Col xs={24} md={24} xl={18}>
          <BoxWrapper>
            <h4 className="font-medium text-xl mb-4 m-2">Preview</h4>

            <Layout className="sidebar">
              <AppHeader imageUrl={imageUrl} />
              <Layout>
                <Row>
                  <Col xs={6} md={12} xl={5}>
                    <div
                      className={`h-full`}
                      style={{ backgroundColor: sideBarColor }}
                    >
                      <div className="sidebar-user-profile">
                        <Avatar size={48} src={avatar} />
                        <div className="sidebar-user-profile-content">
                          <Typography.Title level={3}>
                            Maria Sanoid
                          </Typography.Title>
                          <div className="sidebar-user-profile-role">
                            {constants.USER_ROLE}
                          </div>
                        </div>
                      </div>
                      <ul className="white-color p-4  list-none">
                        <li className="mt-4 mb-1 text-sm font-normal">
                          <IconDashboard /> Dashboard
                        </li>
                      </ul>
                      <ul className="white-color pl-2  list-none">
                        <p className="side-bar-text mt-1 mb-2  text-sm font-normal">
                          People
                        </p>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconPeoples /> Candidates
                        </li>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconClipboardTick /> Offer Letter
                        </li>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconTaskSquare /> Contracts
                        </li>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconProfileUsers /> Interns
                        </li>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconProfileCircle /> Managers
                        </li>
                      </ul>
                      <ul className="white-color pl-3  list-none">
                        <p className="side-bar-text mt-1 mb-2 text-sm font-normal">
                          Organisation
                        </p>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconCourtHouse /> Universities
                        </li>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconData /> Structure
                        </li>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          {" "}
                          <IconCalendarTick /> Attendance
                        </li>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconCalendarRemove /> Leaves
                        </li>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconTimer /> Timesheet
                        </li>
                        <li className="mt-1 mb-3 ml-4 text-sm font-normal">
                          <IconChart /> Documents
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={18} md={12} xl={18}>
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
          </BoxWrapper>
        </Col>
        <Col xs={24} md={24} xl={5}>
          <BoxWrapper className="left-box">
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
