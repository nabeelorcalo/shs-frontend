import { Col, Row, Divider } from "antd";
import { Outlet } from "react-router-dom";
import { Breadcrumb } from "../../components";
import SettingSidebar from "../../components/Setting/SidebarMenu/SettingSidebar";
import "./style.scss";

const Setting = (props: any) => {
  const breadcrumbArray = [
    { name: props.title},
    { name: "Setting"},
  ];
  return (
    <div className="setting">
     <Breadcrumb breadCrumbData={breadcrumbArray}  />
      <Divider />
      <Row gutter={16} className="mt-5">
        <Col xs={4} sm={3} md={9} lg={6} className="setting-sidebar flex flex-col">
          <div className="rounded-lg ">
            <SettingSidebar />
          </div>
        </Col>
        <Col xs={20} sm={21} md={15} lg={18}>
          {props.children}
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
