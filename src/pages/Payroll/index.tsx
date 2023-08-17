import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import { Avatar, Button, Col, Input, Menu, MenuProps, Row, Dropdown, DatePicker, Card, TablePaginationConfig } from 'antd';
import {
  GlobalTable, PageHeader, BoxWrapper, ToggleButton, FiltersButton,
  DropDown, AttendanceCardDetail, NoDataFound, SearchBar
} from "../../components";
import Drawer from "../../components/Drawer";
import UserSelector from "../../components/UserSelector";
import { CardViewIcon, More, TableViewIcon } from "../../assets/images"
import { CalendarIcon } from '../../assets/images';
import useCustomHook from "./actionHandler";
import constants, { ROUTES_CONSTANTS } from '../../config/constants'
import "./style.scss";
import { useRecoilState } from "recoil";
import { payrollFilterState, payrollPaginationState } from "../../store";

const timeframeOptions = ["All", "This Week", "Last Week", "This Month", "Last Month", "Date Range"]

const Payroll = () => {
  const [searchValue, setSearchValue] = useState('');
  let data: any = [];
  const [state, setState] = useState<any>({
    showDrawer: false,
    isToggle: false,
    department: undefined,
    timeFrame: null,
    dateRange: true,
    from: undefined,
    to: undefined,
  })
  const [tableParams, setTableParams]: any = useRecoilState(payrollPaginationState);
  const [filter, setFilter] = useRecoilState(payrollFilterState);
  const [loading, setLoading] = useState(true);

  const { allPayrollData, downloadPdfOrCsv, getData, debouncedSearch,
    getAllDepartmentData, departmentsData }: any = useCustomHook();

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };

  useEffect(() => {
    let args = removeEmptyValues(filter)
    getData(args, setLoading, state.timeFrame);
    getAllDepartmentData();
  }, [filter.searchByUserName, filter.page])

  const payrollData = allPayrollData?.data;
  const csvAllColum = ["No", "Name", "Department", "Joining Date", "Payroll Cycle"]

  const navigate = useNavigate();
  const PopOver: any = (props: any) => {
    const { payrollId, internData } = props;
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              navigate(`/${ROUTES_CONSTANTS.PAYROLL_DETAILS}`,
                { state: { payrollId: payrollId, internData: internData } })
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
      align: 'center'
    },
  ];

  let sum = 0
  let temp = 0
  payrollData?.map((item: any, index: number) => {
    sum = temp
    const monthFrom = dayjs(item.from).format("MMM");
    const monthTo = dayjs(item.to).format("MMM");
    let arr = [];
    arr = item.interns?.map((obj: any, idx: any) => (
      temp = sum + 1,
      sum++,
      {
        key: sum + 1,
        no: `${temp < 10 ? '0' : ''}${temp}`,
        avatar: <Avatar size='large' src={`${constants.MEDIA_URL}/${obj?.userDetail?.profileImage?.mediaId}.${obj?.userDetail?.profileImage?.metaData?.extension}`}>{`${obj?.userDetail?.firstName.charAt(0)}${obj?.userDetail?.lastName.charAt(0)}`}</Avatar>,
        name: `${obj?.userDetail?.firstName} ${obj?.userDetail?.lastName}`,
        department: obj?.internship?.department?.name,
        joining_date: dayjs(obj?.joiningDate)?.format('YYYY-MM-DD'),
        payroll_cycle: `${monthFrom} - ${monthTo}`,
        actions: <PopOver payrollId={item.id} internData={obj} />
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

  const filteredDeparmentsData = departmentsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  filteredDeparmentsData?.unshift({ key: 'all', value: 'All', label: 'All' })

  const handleTimeFrameValue = (val: any) => {
    let item = timeframeOptions.some(item => item === val)
    setState({ ...state, timeFrame: val, dateRange: item });
  }

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
    getData(state)
    setState((prevState: any) => ({
      ...prevState,
      department: undefined,
      timeFrame: null,
      from: undefined,
      to: undefined
    }))
  }

  //pagination function
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  return (
    <div className="payroll-wrapper-main">
      <PageHeader title="Payroll" bordered />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <SearchBar
            placeholder="Search by name"
            handleChange={(e: any) => setFilter({ ...filter, searchByUserName: e })}
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
                      placeholder="Select"
                      onChange={(date: any) => {
                        const startDate = date.startOf('month');
                        setState((prevState: any) => ({ ...prevState, from: startDate }));
                      }}
                      value={state.from}
                      picker="month"
                    />
                  </div>
                  <div className="flex-col w-full">
                    <p>To</p>
                    <DatePicker
                      suffixIcon={<img src={CalendarIcon} alt="calander" />}
                      onChange={(date: any) => {
                        const endDate = date.endOf('month');
                        setState((prevState: any) => ({ ...prevState, to: endDate }));
                      }}
                      placeholder="Select"
                      picker="month"
                      value={state.to}
                    />
                  </div>
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
                  loading={loading}
                  pagination={tableParams?.pagination}
                  pagesObj={allPayrollData?.pagination}
                  handleTableChange={handleTableChange}
                />
              </BoxWrapper> :
              <div className="flex flex-row flex-wrap max-sm:flex-col">
                {
                  data.length === 0 ? <NoDataFound /> : payrollData?.map((items: any, index: number) => {
                    return items.interns.map((val: any) => {
                      const monthFrom = dayjs(items?.from)?.format("MMM");
                      const monthTo = dayjs(items?.to)?.format("MMM");
                      return (
                        data?.length === 0 ? <NoDataFound /> : <AttendanceCardDetail
                          key={items.id}
                          index={1}
                          item={{
                            key: index,
                            avatar: <Avatar size='large' src={`${constants.MEDIA_URL}/${val?.userDetail?.profileImage?.mediaId}.${val?.userDetail?.profileImage?.metaData?.extension}`}>{`${val?.userDetail?.firstName.charAt(0)}${val?.userDetail?.lastName.charAt(0)}`}</Avatar>,
                            name: `${val?.userDetail?.firstName} ${val?.userDetail?.lastName}`,
                            profession: val?.internship?.department?.name,
                          }}
                          payrollCycle={`${monthFrom} - ${monthTo}`}
                          menu={
                            <Menu>
                              <Menu.Item
                                onClick={() =>
                                  navigate(`/${ROUTES_CONSTANTS.PAYROLL_DETAILS}`, { state: { payrollId: items.id, internData: val } })}
                              >
                                View Details
                              </Menu.Item>
                            </Menu>
                          }
                        />
                      )
                    })
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

