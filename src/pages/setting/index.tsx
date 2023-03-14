import { Col, Row, Typography, Divider } from "antd";
import {} from "antd";

import { Outlet } from "react-router-dom";
import { SettingHorizontalLine } from "../../assets/images";
import SettingSidebar from "../../components/Setting/SidebarMenu/SettingSidebar";
import "./style.scss";

const { Title } = Typography;

const Setting = (props: any) => {
  return (
    <div className="setting">
      <div className="flex items-center ">
        <Title className="mt-3" level={3}>{props.title} </Title>
        <span className="mx-2 ">
          <SettingHorizontalLine />
        </span>
        <span className=" text-base font-medium text-secondary-color">
          Setting
        </span>
      </div>
      <Divider className="my-1 mb-3" />
      <Row gutter={16} className="mt-5">
        <Col span={3} sm={8} lg={5} className="setting-sidebar flex flex-col">
          <div className="rounded-lg ">
            <SettingSidebar />
          </div>
        </Col>
        <Col span={21} sm={16} lg={19}>
          {props.children}

          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
