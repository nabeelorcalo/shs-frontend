import React, { useState } from "react";
import { Col, Row, Typography, Space, Input, Button } from "antd";
import { Settinglocation, LocationPeople, CardLocation, } from "../../../../assets/images";
import { NavLink } from "react-router-dom";
import { Alert, SearchBar } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { BoxWrapper } from "../../../../components/BoxWrapper/BoxWrapper";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
const { Title, Text } = Typography;

let overview = [
  {
    name: "London",
    cardImage: <CardLocation />,
    content: "United Kingdom",
    contentImage: <LocationPeople />,
    count: "15 Employees",
  },
  {
    name: "London",
    cardImage: <CardLocation />,
    content: "United Kingdom",
    contentImage: <LocationPeople />,
    count: "15 Employees",
  },
  {
    name: "London",
    cardImage: <CardLocation />,
    content: "United Kingdom",
    contentImage: <LocationPeople />,
    count: "15 Employees",
  },
];

const SettingLocation: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const handleChange = () => { };
  return (
    <div className="setting-location">
      <div className="flex justify-between location-header">
        <SearchBar size="middle" handleChange={handleChange} />
        <NavLink to={`${ROUTES_CONSTANTS.ADD_LOCATION}`}>
          <Button
            size="middle"
            onClick={() => { }}
            className="flex gap-2 setting-add-button white-color teriary-bg-color"
          >
            <Settinglocation /> Add Location
          </Button>
        </NavLink>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index) => {
          return (
            <Col key={index} className="gutter-row" xs={24} lg={12} xxl={8}>
              <BoxWrapper className="location-box-wrapper">
                <div className="flex">
                  <Text>{data.cardImage}</Text>
                  <div className="flex px-3 justify-between mt-1 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text> {data.content}</Text>
                      <Space className="flex py-2">
                        <Text>{data.contentImage}</Text>
                        <Text className="font-normal text-xs p-0 m-0">
                          {data.count}
                        </Text>
                      </Space>
                    </div>
                    <span className="float-right cursor-pointer w-[40px]">
                      <DropDownForSetting
                        link={"/settings/location/add-location"}
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                      />
                    </span>
                  </div>
                </div>
              </BoxWrapper>
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
        title=""
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default SettingLocation;
