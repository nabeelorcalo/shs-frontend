import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Button } from "antd";
import { SettingPayrollAddIcon } from "../../../../assets/images";
import { Alert, Loader, SearchBar } from "../../../../components";
import { BoxWrapper } from "../../../../components";
import { NavLink } from "react-router-dom";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import useCustomHook from "../../../Payroll/actionHandler";
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import './style.scss'

dayjs.extend(duration);

const { Text } = Typography;
const SettingPayroll: React.FC = () => {
  const [state, setState] = useState<any>(
    {
      isDeleteModal: false,
      isEditModal: false,
      id: null,
    }
  )
  const { getData, payrollData, changeHandler, deletePayroll, isLoading } = useCustomHook();

  useEffect(() => {
    getData()
  }, [])

  console.log('payroll data', payrollData);


  const calculateDays = (startingDate: any, endingDate: any) => {
    const start = dayjs(startingDate);
    const end = dayjs(endingDate);
    const duration = dayjs.duration(end.diff(start));
    const durationInDays = duration.asDays();
    return durationInDays
  }

  return (
    <div className="setting-payroll">
      <div>
        <div className="flex justify-between location-header">
          <SearchBar size="middle" handleChange={changeHandler} />
          <NavLink to={`${ROUTES_CONSTANTS.PAYROLL_ADD_CATEGORY}`}>
            <Button
              size="middle"
              className="flex gap-2 setting-add-button white-color teriary-bg-color">
              <SettingPayrollAddIcon /> Add Category
            </Button>
          </NavLink>
        </div>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {!isLoading ? payrollData?.map((data: any, index: any) => {
          const startingDate = dayjs(data?.from);
          const endingDate = dayjs(data?.to);
          const durationInDays = calculateDays(startingDate, endingDate);
          return (
            <Col key={index} className="gutter-row flex" xs={24} lg={12} xxl={8} >
              <BoxWrapper className="w-full">
                <div>
                  <Text className="text-sm font-normal md:text-lg md:font-semibold text-primary-color ">
                    {data?.name}
                  </Text>
                  <span className="float-right cursor-pointer ">
                    <DropDownForSetting
                      link={`${ROUTES_CONSTANTS.PAYROLL_ADD_CATEGORY}`}
                      state={state}
                      setState={setState}
                      editData={data}
                    />
                  </span>
                </div>
                <div className="flex justify-between mt-2 w-full">
                  <div className="flex flex-col">
                    <Text className="text-base font-medium mb-1 text-teriary-color">
                      {data?.interns?.length < 10 ? `0${data?.interns?.length}` : data?.interns?.length}
                      Employees
                    </Text>
                    <Text className="text-sm font-normal content-text ">
                      Payroll Cycle: 
                      {`${dayjs(data?.from).format('MMM,YYYY')} - ${dayjs(data?.to).format('MMM,YYYY')}`
                      // (${durationInDays}days)
                      } 
                      </Text>
                    <Text className="text-sm font-normal content-text">
                      Added Date: {dayjs(data?.createdAt).format('DD/MM/YYYY')}
                    </Text>
                    <Text className="text-sm font-normal content-text">
                      Added By: {data?.addedBy}
                    </Text>
                  </div>
                </div>
              </BoxWrapper>
            </Col>
          );
        }) : <Loader />}

      </Row>
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={500}
        okBtnFunc={() => deletePayroll(state.id)}
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default SettingPayroll;
