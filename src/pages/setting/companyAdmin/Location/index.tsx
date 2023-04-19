import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Space, Button } from "antd";
import { Settinglocation, LocationPeople, CardLocation, } from "../../../../assets/images";
import { NavLink } from "react-router-dom";
import { Alert, BoxWrapper, SearchBar } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import useCustomHook from "./actionHandler";
import { settingLocationState } from "../../../../store";
import { useRecoilState } from "recoil";
const { Text } = Typography;

const demoData = [
  {
    name:"London",
    address:"United Kingdom"
  },
  {
    name:"Bistol",
    address:"United Kingdom"
  },
]

const SettingLocation: React.FC = () => {
  const action = useCustomHook();
  const settingLocation = useRecoilState(settingLocationState)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [locationId, setLocationId] = useState<any>();
  const handleChange = () => { };

  const SetId = (id: any) => {
    setLocationId(id)
    setShowDeleteModal(!showDeleteModal)
  }
  const DeleleHandler = () => {
    action.deleteSettingLocation(locationId)
  }

  useEffect(() => {
    action.getSettingLocation(1)
  }, [])

  return (
    <div className="setting-location">
      <div className="flex justify-between location-header">
        <SearchBar size="middle" handleChange={handleChange} />
        <NavLink to={`${ROUTES_CONSTANTS.ADD_LOCATION}`}>
          <Button
            size="middle"
            className="flex gap-2 setting-add-button white-color teriary-bg-color"
          >
            <Settinglocation /> Add Location
          </Button>
        </NavLink>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {/* {settingLocation[0]?.map((data: any, index) => { */}
        {demoData?.map((data: any, index) => {
          return (
            <Col key={index} className="gutter-row" xs={24} xl={12} xxl={8}>
              <BoxWrapper className="p-3">
                <div className="flex">
                  <CardLocation />
                  <div className="flex  mt-1 w-full ">
                    <div className=" px-2 flex  w-full flex-col">
                      <div className="flex justify-between ">
                        <Text className="text-lg md:font-semibold">{data.name}</Text>
                        <span className="float-right cursor-pointer">
                          <DropDownForSetting
                            link={`${ROUTES_CONSTANTS.ADD_LOCATION}`}
                            showDeleteModal={showDeleteModal}
                            setShowDeleteModal={setShowDeleteModal}
                            id={data?.id}
                            SetId={SetId}
                          />
                        </span>
                      </div>
                      <Text className="font-normal text-teriary-color"> {data.address}</Text>
                      <Space className="flex py-2">
                        <LocationPeople />
                        <Text className="font-normal  text-xs p-0 m-0">
                          {data.companyId
                          }
                        </Text>
                      </Space>
                    </div>
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
        okBtnFunc={DeleleHandler}
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
