import { useEffect, useState } from "react";
import { Typography, Row, Col, Button } from "antd";
import {
  CasualLeave,
  SettingLeaves,
  MedicalLeave,
  SickLeave,
  WorkFromHome,
} from "../../../../assets/images";
import { Alert, SearchBar, DropDownForSetting, NoDataFound, Loader } from "../../../../components";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import useLeavesCustomHook from "./actionHandler";
const { Text } = Typography;

const SettingLeave = () => {
  const [searchValue, setSearchValue] = useState<any>(null);
  const [state, setState] = useState<any>(
    {
      isDeleteModal: false,
      id: null
    }
  )
  const { getSettingLeaves, settingLeaveData, deleteSettingLeaves, loading } = useLeavesCustomHook();

  useEffect(() => {
    getSettingLeaves(searchValue)
  }, [searchValue])

  const imageHanlder = (type: any) => {
    switch (type) {
      case 'Sick Leave':
        return <SickLeave />
      case 'Casual Leave':
        return <CasualLeave />
      case 'WFH Leave':
        return <WorkFromHome />
      case 'Medical Leave':
        return <MedicalLeave />
    }
  }
  return (
    <div className="setting-leaves">
      <div>
        <div className="flex justify-between location-header">
          <SearchBar
          placeholder="Search By Leave"
            className="max-sm:w-full w-[375px]"
            size="middle"
            handleChange={(e: any) => setSearchValue(e)}
          />
          <NavLink to={ROUTES_CONSTANTS.LEAVES_ADD_POLICY}>
            <Button
              // size="middle"
              onClick={() => { }}
              className="flex gap-3 white-color teriary-bg-color rounded-lg border-none md:w-[166px]"
            >
              <SettingLeaves /> Add Policy
            </Button>
          </NavLink>
        </div>
      </div>
      {settingLeaveData?.length === 0 && <NoDataFound />}
      <Row gutter={[20, 20]} className="mt-5">
        {settingLeaveData?.map((data: any, index: any) => {
          return (
            <>
              {loading ? <Loader /> : <Col key={index} className="gutter-row" xs={24} lg={12} xl={8}>
                <div className="setting-leaves-box-wrapper w-full flex flex-col">
                  <div className="float-right place-items-end cursor-pointer flex justify-end">
                    <DropDownForSetting
                      link={ROUTES_CONSTANTS.LEAVES_ADD_POLICY}
                      state={state}
                      setState={setState}
                      editData={data}
                    />
                  </div>
                  <div className="flex ">
                    <span> {imageHanlder(data?.name)}</span>
                    <Text className="text-sm dashboard-primary-color font-normal md:text-lg md:font-semibold pt-3 pl-2 m-0">
                      {data?.name}
                    </Text>
                  </div>
                </div>
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
        okBtnFunc={() => deleteSettingLeaves(state.id)}
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default SettingLeave;
