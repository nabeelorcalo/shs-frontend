import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Input } from "antd";
import { GlassMagnifier, SettingPayrollAddIcon } from "../../../../assets/images";
import { Alert, ButtonThemePrimary, Loader, NoDataFound } from "../../../../components";
import { BoxWrapper } from "../../../../components";
import { NavLink } from "react-router-dom";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import usePayrollCustomHook from "./actionHandler";
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import './style.scss'

dayjs.extend(duration);

const { Text } = Typography;
const SettingPayroll: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [state, setState] = useState<any>(
    {
      isDeleteModal: false,
      isEditModal: false,
      action: '',
      id: null,
    }
  )
  const { getPayrollData, payrollData, deletePayroll, isLoading, debouncedSearch } = usePayrollCustomHook();

  useEffect(() => {
    getPayrollData(state, searchValue)
  }, [searchValue])

  console.log(payrollData, 'datadata');


  // handle search interns 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  function calculateTotalMonths(startDate: any, endDate: any) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const diffYears = end.diff(start, 'year');
    const diffMonths = end.diff(start, 'month');

    return diffYears * 12 + diffMonths;
  }

  return (
    <div className="setting-payroll">
      <div>
        <div className="flex justify-between location-header">
          <div className="input-wrapper">
            <Input
              className='search-bar max-sm:w-full w-[375px]'
              placeholder="Search by payroll"
              onChange={debouncedResults}
              prefix={<GlassMagnifier />}
            />
          </div>

          <NavLink to={`${ROUTES_CONSTANTS.PAYROLL_ADD_CATEGORY}`}>
            <ButtonThemePrimary
              icon={<SettingPayrollAddIcon />}
              onClick={() => setState({ ...state, action: 'add' })}>
              Add Payroll cycle
            </ButtonThemePrimary>
            {/* <Button
              onClick={() => setState({ ...state, action: 'add' })}
              size="middle"
              className="flex gap-2 setting-add-button white-color teriary-bg-color">
              <SettingPayrollAddIcon /> Add Payroll cycle
            </Button> */}
          </NavLink>
        </div>
      </div>
      {
        payrollData?.length === 0 ? <NoDataFound /> : <Row gutter={[20, 20]} className="mt-5">
          {!isLoading ? payrollData?.map((data: any, index: any) => {
            const startingDate = data?.from;
            const endingDate = data?.to;
            const durationInDays = calculateTotalMonths(startingDate, endingDate);
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
                        {data?.interns?.length < 10 ? `0${data?.interns?.length} ` : data?.interns?.length}
                        Employees
                      </Text>
                      <Text className="text-sm font-normal content-text ">
                        Payroll Cycle:
                        {` ${dayjs(data?.from).format('MMM, YYYY')} - ${dayjs(data?.to).format('MMM, YYYY')}`}
                        {durationInDays < 2 ? ` (${durationInDays} month)` : ` (${durationInDays} months)`}
                      </Text>
                      <Text className="text-sm font-normal content-text">
                        Added Date: {dayjs(data?.createdAt).format('DD/MM/YYYY')}
                      </Text>
                    </div>
                  </div>
                </BoxWrapper>
              </Col>
            );
          }) : <Loader />}

        </Row>
      }

      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={570}
        okBtnFunc={() => deletePayroll(state.id)}
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div >
  );
};

export default SettingPayroll;
