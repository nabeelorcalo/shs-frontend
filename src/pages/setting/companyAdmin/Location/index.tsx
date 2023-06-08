import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Space, Button } from "antd";
import { Settinglocation, LocationPeople, CardLocation, } from "../../../../assets/images";
import { NavLink } from "react-router-dom";
import { Alert, BoxWrapper, Loader, NoDataFound, SearchBar } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import useCustomHook from "./actionHandler";
const { Text } = Typography;

const SettingLocation: React.FC = () => {
  const [state, setState] = useState<any>(
    {
      isDeleteModal: false,
      id: null
    }
  )
  const { deleteSettingLocation, getSettingLocation, settingLocation, loading } = useCustomHook();

  useEffect(() => {
    getSettingLocation(null)
  }, [])

  const handleChange = (event: any) => {
    getSettingLocation(event)
  };

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
      {settingLocation?.length === 0 && <NoDataFound />}
      <Row gutter={[20, 20]} className="mt-5">
        {settingLocation?.map((data: any, index) => {
          return (
            <>
              {loading ? <Loader /> : <Col key={index} className="gutter-row" xs={24} xl={12} xxl={8}>
                <BoxWrapper className="location-box-wrapper">
                  <div className="flex">
                    {/* <img src={imageUrl} alt="location-img" /> */}
                    <CardLocation />
                    <div className="flex  mt-1 w-full ">
                      <div className=" px-2 flex  w-full flex-col">
                        <div className="flex justify-between ">
                          <Text className="text-lg md:font-semibold">{data.name}</Text>
                          <span className="float-right cursor-pointer">
                            <DropDownForSetting
                              link={`${ROUTES_CONSTANTS.ADD_LOCATION}`}
                              state={state}
                              setState={setState}
                              editData={data}
                            />
                          </span>
                        </div>
                        <Text className="font-normal text-teriary-color">
                          {data.country}
                        </Text>
                        <Space className="flex py-2">
                          <LocationPeople />
                          <Text className="text-sm text-teriary-color">
                            {data.companyId}
                          </Text>
                        </Space>
                      </div>
                    </div>
                  </div>
                </BoxWrapper>
              </Col>}
            </>
          );
        })}
      </Row>
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={500}
        title=""
        children={<p>Are you sure you want to delete this?</p>}
        okBtnFunc={() => deleteSettingLocation(state.id)}
      />
    </div>
  );
};

export default SettingLocation;
