import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import { Avatar, Button, Col, Input, Menu, MenuProps, Row, Dropdown, DatePicker } from 'antd';
import {
  GlobalTable, PageHeader, BoxWrapper, ToggleButton, FiltersButton,
  DropDown, AttendanceCardDetail, NoDataFound
} from "../../components";
import Drawer from "../../components/Drawer";
import UserSelector from "../../components/UserSelector";
import { CardViewIcon, GlassMagnifier, More, TableViewIcon } from "../../assets/images"
// import { Dropdown } from 'antd';
import { CalendarIcon } from '../../assets/images';
import useCustomHook from "./actionHandler";
import constants, { ROUTES_CONSTANTS } from '../../config/constants'
import type { DatePickerProps } from 'antd';
import "./style.scss";

const PopOver: any = () => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            navigate(`/${ROUTES_CONSTANTS.PAYROLL_DETAILS}`);
          }}
        >
          View Details
        </a>
      ),
    }
  ];
  return (
    <Dropdown className="cursor-pointer" menu={{ items }} placement="bottomRight" trigger={['click']} overlayStyle={{ width: 180 }}>
      <More />
    </Dropdown>
  );
};

// const departmentOptions = ["Business analyst", "Research analyst", "Accountant", "Administrator", "HR Cordinator", "All"]
const timeframeOptions = ["All", "This Week", "Last Week", "This Month", "Last Month", "Date Range"]
const payrollCycleOptions = ["3 Months", "6 Months", "9 Months", "12 Months", "All"]

const Payroll = () => {
  const [searchValue, setSearchValue] = useState('');
  let data: any = [];
  const [state, setState] = useState<any>({
    showDrawer: false,
    isToggle: false,
    department: undefined,
    timeFrame: null,
    dateRange: true,
    // from: undefined,
    // to: undefined,
  })
  const navigate = useNavigate();
  const { payrollData, downloadPdfOrCsv, getData, debouncedSearch,
    getAllDepartmentData, departmentsData } = useCustomHook();

  useEffect(() => {
    getData(state, searchValue, state.timeFrame);
    getAllDepartmentData();
  }, [searchValue])

  const csvAllColum = ["No", "Name", "Department", "Joining Date", "Payroll Cycle"]

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "avatar",
      key: "avatar",
      title: "Avatar",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "department",
      key: "department",
      title: "Department",
    },
    {
      dataIndex: "joining_date",
      key: "joining_date",
      title: "Joining Date",
    },
    {
      dataIndex: "payroll_cycle",
      key: "payroll_cycle",
      title: "Payroll Cycle",
    },
    {
      dataIndex: "actions",
      key: "actions",
      title: "Actions",
    },
  ];

  payrollData?.map((item: any, index: any) => {
    const monthFrom = dayjs(item.from).format("MMM");
    const monthTo = dayjs(item.to).format("MMM");
    let arr = [];
    arr = item.interns?.map((obj: any) => ({
      key: index,
      no: `${item.interns?.length < 10 ? `0${index + 1}` : index + 1}`,
      avatar: <Avatar src={`${constants.MEDIA_URL}/${obj?.userDetail?.profileImage?.mediaId}.${obj?.userDetail?.profileImage?.metaData?.extension}`}>{`${obj?.userDetail?.firstName.charAt(0)}${obj?.userDetail?.lastName.charAt(0)}`}</Avatar>,
      name: item?.name,
      department: obj?.internship?.department?.name,
      joining_date: dayjs(obj?.joiningDate)?.format('YYYY-MM-DD'),
      payroll_cycle: `${monthFrom} - ${monthTo}`,
      actions: <PopOver />
    }))
    data = [...data, ...arr]
  })

  const handleToggle = () => {
    setState((prevState: any) => ({
      ...prevState,
      isToggle: !state.isToggle,
    }));
  };

  const handleDrawer = () => {
    setState((prevState: any) => ({
      ...prevState,
      showDrawer: !state.showDrawer
    }))
  }

  const handleDepartment = (event: any) => {
    setState((prevState: any) => ({
      ...prevState,
      department: event
    }))
  }
  // const updateDepartment = (event: any) => {
  //   const value = event.target.innerText;
  //   setState((prevState: any) => ({
  //     ...prevState,
  //     deparment: value
  //   }))
  // }
  // const updateTimeFrame = (event: any) => {
  //   const value = event.target.innerText;
  //   setState((prevState: any) => ({
  //     ...prevState,
  //     timeFrame: value
  //   }))
  // }

  // const updatePayrollCycle = (event: any) => {
  //   const value = event.target.innerText;
  //   setState((prevState: any) => ({
  //     ...prevState,
  //     payrollCycle: value
  //   }))
  // }

  const filteredDeparmentsData = departmentsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  filteredDeparmentsData.unshift({ key: 'all', value: 'All', label: 'All' })

  const handleTimeFrameValue = (val: any) => {
    let item = timeframeOptions.some(item => item === val)
    setState({ ...state, timeFrame: val, dateRange: item });
  }

  const onChange: DatePickerProps['onChange'] = (date) => {
    console.log(date);
  };

  // handle apply filters 
  const handleApplyFilter = () => {
    // date pickers function 
    if (state?.dateRange) {
      getData(state, searchValue, state?.timeFrame);
    }
    else {
      const [startDate, endDate] = state?.timeFrame?.split(",")
      getData(state, searchValue, "DATE_RANGE", startDate, endDate);
    }
    setState((prevState: any) => ({
      ...prevState,
      showDrawer: false
    }))
  }

  // Handle Reset filters 
  const handleResetFilter = () => {
    getData()
    setState((prevState: any) => ({
      ...prevState,
      department: undefined,
      timeFrame: null,
    }))
  }

  // Handle Search interns 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };


  return (
    <div className="payroll-wrapper-main">
      <PageHeader title="Payroll" bordered />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className='search-bar'
            placeholder="Search by name"
            onChange={debouncedResults}
            prefix={<GlassMagnifier />}
          />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
          <FiltersButton
            label="Filters"
            onClick={handleDrawer}
          />

          <Drawer
            closable
            open={state.showDrawer}
            onClose={handleDrawer}
            title="Filters"
          >
            <React.Fragment>
              <div className="flex flex-col gap-10">

                <div className="flex flex-col gap-2">
                  <UserSelector
                    label="Department"
                    placeholder="Select"
                    value={state.department}
                    onChange={(event: any) => { handleDepartment(event) }}
                    options={filteredDeparmentsData}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <p>Time Frame</p>
                  <DropDown
                    name="Select"
                    options={timeframeOptions}
                    showDatePickerOnVal={'Date Range'}
                    requireRangePicker placement="bottom"
                    value={state.timeFrame}
                    setValue={(e: any) => handleTimeFrameValue(e)}
                  />
                </div>

                <div className="flex  gap-2">
                  <div className="flex-col w-full ">
                    <p>From</p>
                    <DatePicker
                      suffixIcon={<img src={CalendarIcon} alt="calander" />}
                      className="input-wrapper"
                      placeholder="Select"
                      onChange={onChange}
                      value={state.from}
                      picker="month" />
                  </div>
                  {/* <DropDown
                      name="select"
                      options={payrollCycleOptions}
                      setValue={() => { updatePayrollCycle(event) }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.payrollCycle}
                    /> */}
                  <div className="flex-col w-full">
                    <p>To</p>
                    <DatePicker
                      suffixIcon={<img src={CalendarIcon} alt="calander" />}
                      onChange={onChange}
                      placeholder="Select"
                      picker="month"
                      value={state.to}
                    />
                  </div>
                  {/* <DropDown
                      name="select"
                      options={payrollCycleOptions}
                      setValue={() => { updatePayrollCycle(event) }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.payrollCycle}
                    /> */}
                </div>

                <div className="flex flex-row gap-3 justify-end">
                  <Button
                    type="default"
                    size="middle"
                    className="button-default-tertiary"
                    onClick={handleResetFilter}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    size="middle"
                    className="button-tertiary"
                    onClick={handleApplyFilter}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </React.Fragment>
          </Drawer>
          <div className="flex gap-4 justify-between">
            <ToggleButton
              isToggle={state.isToggle}
              onTogglerClick={handleToggle}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className='w-[88px]'
            />
            <DropDown
              options={[
                'PDF',
                'Excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(event, csvAllColum, data, "Company Admin Payroll")
              }}
            />
          </div>
        </Col>
        <Col xs={24}>
          {
            state.isToggle ?
              <BoxWrapper>
                <GlobalTable
                  columns={columns}
                  tableData={data}
                />
              </BoxWrapper> :
              <div className="flex flex-row flex-wrap max-sm:flex-col">
                {
                  data.length === 0 ? <NoDataFound /> : data?.map((items: any, index: number) => {
                    const monthFrom = dayjs(items?.from)?.format("MMM");
                    const monthTo = dayjs(items?.to)?.format("MMM");
                    return (
                      payrollData?.length === 0 ? <NoDataFound /> : <AttendanceCardDetail
                        key={index}
                        index={1}
                        item={{
                          key: index,
                          avatar: items.avatar,
                          name: items?.name,
                          profession: items.department,
                        }}
                        payrollCycle={`${monthFrom} - ${monthTo}`}
                        menu={
                          <Menu>
                            <Menu.Item>
                              <Link to={`/${ROUTES_CONSTANTS.PAYROLL_DETAILS}`}>View Details</Link>
                            </Menu.Item>
                          </Menu>
                        }
                      />
                    )
                  })
                }
              </div>
          }
        </Col>
      </Row>
    </div>
  );
};

export default Payroll;

