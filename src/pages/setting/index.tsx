import { Col, Row } from "antd";
import { Typography } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SettingHorizontalLine } from "../../assets/images";
import SettingSidebar from "../../components/Setting/SidebarMenu/SettingSidebar";
import './style.scss'

const { Title } = Typography;

const Setting = (props: any) => {
  return (
    <div className="setting">
      <div className="flex">
        <Title level={3}>{props.title} </Title>
        <span className="mx-2">
          <SettingHorizontalLine />
        </span>
        <Title className="mt-0.5" level={4}>
          Setting
        </Title>
      </div>
      <Row gutter={16} className="mt-5">
        <Col sm={2} md={8} lg={5} className="setting-sidebar flex flex-col">
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              height: "100%",
              textAlign: "left",
              // padding: "30px 20px",
           
            }}
         
          >
            <div className="rounded-lg ">
              <SettingSidebar />
            </div>
          </div>
        </Col>
        <Col sm={24} md={16} lg={19}>
          {props.children}

          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
