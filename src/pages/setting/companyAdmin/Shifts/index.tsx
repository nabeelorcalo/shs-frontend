import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Button, Input } from "antd";
import { GlassMagnifier, SettingShift } from "../../../../assets/images";
import { Alert, BoxWrapper, NoDataFound } from "../../../../components";
import { NavLink } from "react-router-dom";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import useShiftsCustomHook from './actionHandler'
import dayjs from "dayjs";
import './style.scss'

const { Text } = Typography;

const SettingShifts: React.FC = () => {

  const [searchValue, setSearchValue] = useState();
  const [state, setState] = useState<any>(
    {
      isDeleteModal: false,
      id: null
    }
  )

  const { shiftsData, getAllShifts, debouncedSearch, deleteShifts } = useShiftsCustomHook();

  useEffect(() => {
    getAllShifts(searchValue)
  }, [searchValue])


  // handle search shifts 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  // console.log('aksjsakjaslkjas', state);

  return (
    <div className="setting-shifts">
      <div className="flex justify-between location-header">
        <div className="input-wrapper">
          <Input className='search-bar' placeholder="Search"
            onChange={debouncedResults} prefix={<GlassMagnifier />} />
        </div>
        <NavLink to={`${ROUTES_CONSTANTS.ADD_SHIFT}`}>
          <Button
            size="middle"
            onClick={() => { }}
            className="flex gap-2 setting-add-button white-color teriary-bg-color"  >
            <SettingShift />
            Add Shift
          </Button>
        </NavLink>
      </div>
      {shiftsData?.length === 0 ? <NoDataFound /> : <Row gutter={[20, 20]} className="mt-5">
        {shiftsData?.map((data: any, index: any) => {
          const startTime = dayjs(data?.from)?.format('h:mm')
          const endTime = dayjs(data?.to)?.format('h:mm')
          return (
            <Col key={index} className="gutter-row flex" xs={24} lg={12} xxl={8}>
              <BoxWrapper className="setting-shift-box-wrapper w-full">
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Text className="text-sm font-normal md:text-lg md:font-semibold text-primary-color">
                        {data?.name}
                      </Text>
                      <Text className="text-base font-medium text-teriary-color">
                        {data?.interns?.length < 0 ? `${data?.interns?.length}` : `0${data?.interns?.length}`}
                      </Text>
                      <Text className="text-sm font-normal content-text">
                        {`Time: ${startTime} to ${endTime}`}
                      </Text>
                      <Text className="text-sm font-normal content-text">
                        {`Duration: ${dayjs(data?.duration).format('h')} hours`}
                      </Text>
                    </div>
                    <span className="float-right cursor-pointer w-[40px]">
                      <DropDownForSetting
                        link={`${ROUTES_CONSTANTS.ADD_SHIFT}`}
                        // showDeleteModal={showDeleteModal}
                        // setShowDeleteModal={setShowDeleteModal}
                        state={state}
                        setState={setState}
                        editData={data}
                      />
                    </span>
                  </div>
                </div>
              </BoxWrapper>
            </Col>
          );
        })}
      </Row>}

      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={500}
        title=""
        okBtnFunc={() => deleteShifts(state.id)}
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default SettingShifts;
