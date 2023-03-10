import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { DepartmentAddIcon, LocationMore } from "../../../assets/images";
import { Col, Row, Typography, Space, Dropdown, Menu } from "antd";
// import { Button } from "../../Button";
import { SearchBar } from "../../SearchBar/SearchBar";
import { BoxWrapper } from "../../BoxWrapper/boxWrapper";
import "./Department.scss";
import moreIcon from "../../../assets/images/setting/More.svg";
import { PopUpModal } from "../../Model";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "../../Button";
import { boolean } from "yargs";
import More from "../../../assets/images/setting/More.svg";

const { Title, Text } = Typography;

const DropDownForLocation = (props:any) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  return (
    <Dropdown
      className="dropdown"
      overlay={
        <Menu>
          <Menu.Item key="1"><span onClick={() => {props.setShowHide(!props.showHide) , setVisible(false)} }>Edit</span></Menu.Item>
          <Menu.Item key="2">Delete</Menu.Item>
        </Menu>
      }
      visible={visible}
      onVisibleChange={handleVisibleChange}
      trigger={["click"]}
    >
      <div style={{ cursor: "pointer" }}>
        <LocationMore width="24px" />
      </div>
    </Dropdown>
  );
};
let overview = [
  {
    id: 0,
    name: "Finance",
    content:
      "The finance department is responsible for the financial planning and management of the company.",
  },
  {
    id: 1,
    name: "Human Resources",
    content:
      "The finance department is responsible for the financial planning and management of the company.",
  },
  {
    id: 2,
    name: "Design",
    content:
      "The finance department is responsible for the financial planning and management of the company.",
  },
];

const SettingDepartment: React.FC = (props: any) => {
  const [showHide, setShowHide] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState("0");
  const handleChange = () => {};

  return (
    <div className="department">
      <PopUpModal
        cancelBtntxt="Cancel"
        okBtntxt="Submit"
        state={showHide}
        setState={setShowHide}
        title="Modal Title Customizable"
        width={600}
        // children= {<p>adsfasd</p>}
      >
        <p>Write your JSX here / Import Components</p>
      </PopUpModal>
      <div className="flex justify-between">
        <SearchBar size="large" handleChange={handleChange} />

        <Button
          color="#4a9d77"
          icon={<DepartmentAddIcon className="mx-2" />}
          label="Add Department"
          onClick={() => setShowHide(!showHide)}
          type="primary"
          size="middle"
        />

        {/* <Button type="primary" icon={<span><DepartmentAddIcon className="mx-2" /></span>} size="small">
          <span className="">  Add department</span> </Button> */}
      </div>
      <Row gutter={[10, 10]} className="mt-5">
        {overview.map((data: any, index) => {
          return (
            <Col key={index} className="gutter-row" xs={24} md={12} xxl={8}>
              <BoxWrapper>
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text className="text-sm font-normal">
                        {" "}
                        {data.content}
                      </Text>
                    </div>

                    <span className="float-right cursor-pointer w-[40px]">
                      <DropDownForLocation showHide={showHide} setShowHide={setShowHide} />
                    </span>
                  </div>
                </div>
              </BoxWrapper>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SettingDepartment;
