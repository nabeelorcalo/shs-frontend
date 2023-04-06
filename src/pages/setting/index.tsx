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
      <Divider className="my-1 mb-3" />
      <Row gutter={[20,20]} className="mt-5 settings-row">
        <Col xs={24} sm={8} lg={5} className="setting-sidebar flex flex-col">
          <div className="rounded-lg ">
            <SettingSidebar />
          </div>
        </Col>
        <Col xs={24} sm={16} lg={19}>
          {props.children}
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
