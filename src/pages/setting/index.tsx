import { Col, Row, Divider } from "antd";
import { Outlet } from "react-router-dom";
import { Breadcrumb } from "../../components";
import SettingSidebar from "../../components/Setting/SidebarMenu/SettingSidebar";
import "./style.scss";

const Setting = (props: any) => {
  const breadcrumbArray = [
    { name: props.title},
    { name: " Setting "},
  ];
  return (
    <div className="setting">
     <Breadcrumb breadCrumbData={breadcrumbArray} className="breadcrumb" />
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
