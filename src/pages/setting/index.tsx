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
      <Row gutter={[20,20]} className="mt-5 settings-row">
        <Col xs={24} sm={10} md={10} lg={6} xxl={5} className="flex flex-col">
          <div className="rounded-lg ">
            <SettingSidebar />
          </div>
        </Col>
        <Col xs={24} sm={14} md={14} lg={18} xxl={19}>
          {props.children}
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
