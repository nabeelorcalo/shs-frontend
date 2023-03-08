import { Col, Row } from "antd";
import { Typography } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SettingHorizontalLine } from "../../assets/images";
import SettingSidebar from "../../components/Setting/SidebarMenu/SettingSidebar";

const { Title } = Typography;

const Setting = (props: any) => {
  const [channels, setChannels]: any = useState("hidden");
  const [time, setTime] = useState("hidden");

  return (
    <>
      <div className="flex ">
        <Title level={3}>Location </Title>
        <span className="mx-2">
          <SettingHorizontalLine />
        </span>
        <Title className="mt-1" level={4}>Setting </Title>
      </div>
      <Row gutter={16}>
        <Col span={5}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              height: "100%",
              textAlign: "left",
              padding: "30px 20px",
            }}
          >
            <SettingSidebar />
          </div>
        </Col>
        <Col span={19}>
          <Title level={2}>{props.title}</Title>
          {/* <h2>dddd</h2> */}
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default Setting;
