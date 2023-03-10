import React from "react";
import { NavLink } from "react-router-dom";
import { DepartmentAddIcon, LocationMore } from "../../../assets/images";
import { Col, Row, Typography, Space, Dropdown, Menu } from "antd";
import { Button } from "../../Button";
import { SearchBar } from "../../SearchBar/SearchBar";
import { BoxWrapper } from "../../BoxWrapper/boxWrapper";
import './Department.scss'
import moreIcon from '../../../assets/images/setting/More.svg'

const { Title, Text } = Typography;
const menu = (
  <Menu>
    <Menu.Item key="1">Edit</Menu.Item>
    <Menu.Item key="2">Delete</Menu.Item>
  </Menu>
);
let overview = [
  {
    name: "Finance",
    content:
      "The finance department is responsible for the financial planning and management of the company.",
  },
  {
    name: "Human Resources",
    content:
      "The finance department is responsible for the financial planning and management of the company.",
  },
  {
    name: "Design",
    content:
      "The finance department is responsible for the financial planning and management of the company.",
  },
];

const SettingDepartment: React.FC = () => {
  const handleChange = () => {};
  return (
    <div className="department">
      <div className="flex justify-between">
        <SearchBar size="large" handleChange={handleChange} />
        <NavLink to="/settings/add-location">
          <Button
            color="#4a9d77"
            icon={<DepartmentAddIcon className="mx-2" />}
            label="Add Department"
            onClick={() => {}}
            type="primary"
            size="large"
          />
        </NavLink>
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
                      <Text className="text-sm font-normal"> {data.content}</Text>
                    </div>

                    <span className="float-right cursor-pointer">
                      <Dropdown  className = "dropdown w-[24px]" overlay={menu} placement="bottomRight">
                       <img src={moreIcon} />
                      </Dropdown>
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
