import { DownloadOutlined, DownOutlined } from "@ant-design/icons";

import React from "react";
import { Col, Row, Typography, Space, Dropdown, Menu } from "antd";
import {
  LocationImage,
  LocationMore,
  Settinglocation,
  LocationPeople,
} from "../../../assets/images";
// import { Button } from "../../Button";
import { SearchBar } from "../../SearchBar/SearchBar";
import {BoxWrapper }from "../../BoxWrapper/boxWrapper";
import cardImage from "../../../assets/images/setting/locationImage.svg";
import { DropDown } from "../../Dropdown/DropDown";
import { Button } from "../../Button";
import { NavLink } from "react-router-dom";
import { AddEventInCalendar } from "../../AddEventInCalendar";
const { Title, Text } = Typography;
const menu = (
  <Menu>
    <Menu.Item key="1">Edit</Menu.Item>
    <Menu.Item key="2">Delete</Menu.Item>
  </Menu>
);
let overview = [
  {
    name: "London",
    cardImage: cardImage,
    content: "United Kingdom",
    contentImage: <LocationPeople />,
    count: "15 Employees",
  },
  {
    name: "London",
    cardImage: cardImage,
    content: "United Kingdom",
    contentImage: <LocationPeople />,
    count: "15 Employees",
  },
  {
    name: "London",
    cardImage: cardImage,
    content: "United Kingdom",
    contentImage: <LocationPeople />,
    count: "15 Employees",
  },
];

const SettingLocation: React.FC = () => {
  const handleChange = () => { };
  return (
    <div>
      <div className="flex justify-between">
        <SearchBar size="large" handleChange={handleChange} />
        <NavLink to="/settings/add-location">
          <Button
            color="#4a9d77"
            icon={<Settinglocation className="mx-2" />}
            label="Add Location"
            onClick={() => { }}
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
                  <img src={cardImage} />
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text> {data.content}</Text>
                      <Space className="flex py-2">
                        <Text className="">{data.contentImage}</Text>
                        <Text className="font-normal text-xs p-0 m-0">
                          {data.count}
                        </Text>
                      </Space>
                    </div>

                    <span className="float-right cursor-pointer">
                      <Dropdown overlay={menu} placement="bottomRight">
                        <LocationMore />
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

export default SettingLocation;
