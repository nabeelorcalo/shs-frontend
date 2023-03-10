import React, { useState } from "react";
import { Col, Row, Typography, Space, Input } from "antd";
import { Settinglocation, LocationPeople } from "../../../assets/images";
import { SearchBar } from "../../SearchBar/SearchBar";
import cardImage from "../../../assets/images/setting/locationImage.svg";
import { Button } from "../../Button";
import { NavLink } from "react-router-dom";
import DropDownForSetting from "../Common/CustomSettingDropdown";
import { Alert } from "../../Alert";
import "./Location.scss";
const { TextArea } = Input;
const { Title, Text } = Typography;

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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const handleChange = () => {};
  return (
    <div className="setting-location">
      <div className="flex justify-between">
        <SearchBar size="large" handleChange={handleChange} />
        <NavLink to="/settings/add-location">
          <Button
            color="#4a9d77"
            icon={<Settinglocation className="mx-2" />}
            label="Add Location"
            onClick={() => {}}
            type="primary"
            size="middle"
          />
        </NavLink>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index) => {
          return (
            <Col key={index} className="gutter-row" xs={24} md={12} xxl={8}>
              <div className="location-box-wrapper">
                <div className="flex">
                  <img src={cardImage} />
                  <div className="flex px-3 justify-between mt-1 w-full">
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

                    <span className="float-right cursor-pointer w-[40px]">
                      <DropDownForSetting
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={showDeleteModal}
        setState={setShowDeleteModal}
        type="error"
        width={500}
      >
        <p>Are you sure you want to delete this location?</p>
      </Alert>
    </div>
  );
};

export default SettingLocation;
