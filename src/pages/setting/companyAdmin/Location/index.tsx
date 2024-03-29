import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Typography, Space, Button } from "antd";
import { Settinglocation, LocationPeople, } from "../../../../assets/images";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert, BoxWrapper, ButtonThemePrimary, Loader, NoDataFound, SearchBar } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import locationImg from "../../../../assets/images/setting/locationImage.svg";
import useCustomHook from "./actionHandler";
const { Text } = Typography;

const SettingLocation: React.FC = () => {
  const navigate = useNavigate()
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
        <SearchBar
          placeholder="Search by location"
          className="max-sm:w-full w-[375px]"
          size="middle"
          handleChange={handleChange} 
        />
        <ButtonThemePrimary onClick={() => navigate(`${ROUTES_CONSTANTS.ADD_LOCATION}`)} >
          <Settinglocation /> Add Location
        </ButtonThemePrimary>
      </div>
      {settingLocation?.length === 0 && <NoDataFound />}
      <Row gutter={[20, 20]} className="mt-5">
        {settingLocation?.map((data: any) => {
          return (
            <Fragment key={data.id}>
              {loading ? <Loader /> : <Col className="gutter-row" xs={24} xl={12} xxl={8}>
                <BoxWrapper className="location-box-wrapper">
                  <div className="flex">
                    <img
                      src={data.image ? `${constants.MEDIA_URL}/${data?.image?.mediaId}.${data?.image?.metaData?.extension}`
                        :
                        locationImg}
                      alt='locationImg'
                      width={100}
                      height={100}
                    />
                    <div className="flex  mt-1 w-full ">
                      <div className=" px-2 flex  w-full flex-col">
                        <div className="flex justify-between ">
                          <Text className="text-lg md:font-semibold dashboard-primary-color">{data.name}</Text>
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
                            {data.totalInterns} Employees
                          </Text>
                        </Space>
                      </div>
                    </div>
                  </div>
                </BoxWrapper>
              </Col>}
            </Fragment>
          );
        })}
      </Row>
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={570}
        children={<p>Are you sure you want to delete this?</p>}
        okBtnFunc={() => deleteSettingLocation(state.id)}
      />
    </div>
  );
};

export default SettingLocation;
