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
import { useRecoilState, useResetRecoilState } from "recoil";
import { payrollFilterState, payrollPaginationState } from "../../store";

const timeframeOptions = ["All", "This Week", "Last Week", "This Month", "Last Month", "Date Range"]

const Payroll = () => {
  const [state, setState] = useState<any>({
    showDrawer: false,
    isToggle: false,
    dateRange: true,
  })
  const [tableParams, setTableParams]: any = useRecoilState(payrollPaginationState);
  const [filter, setFilter] = useRecoilState(payrollFilterState);
  const resetList = useResetRecoilState(payrollFilterState);
  const resetTableParams = useResetRecoilState(payrollPaginationState);
  const [loading, setLoading] = useState(true);

  const { allPayrollData, downloadPdfOrCsv, getData,
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
    args.page = state.isToggle ? args.page : 1;
    args.limit = state.isToggle ? args.limit : 1000;
    getData(args, setLoading, state.timeFrame);
    getAllDepartmentData();
  }, [filter.searchByUserName, filter.page, state.isToggle])

  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);
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

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const newPayrollData = payrollData?.map((item: any, index: any) => {
    const monthFrom = dayjs(item.from).format("MMM");
    const monthTo = dayjs(item.to).format("MMM");
    return {
      key: index,
      no: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
      avatar: <Avatar size='large' src={`${constants.MEDIA_URL}/${item?.imageUrl?.mediaId}.${item?.imageUrl?.metaData?.extension}`}>{item?.internName?.charAt(0)}</Avatar>,
      name: item?.internName,
      department: item?.department,
      joining_date: dayjs(item?.joiningDate)?.format('YYYY-MM-DD'),
      payroll_cycle: `${monthFrom} - ${monthTo}`,
      actions: <PopOver payrollId={item.id} internData={item} />
    }
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
    setFilter((prevState: any) => ({
      ...prevState,
      departmentId: event
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
    setFilter({ ...filter, filterType: val?.toUpperCase()?.replace(" ", "_") });
    setState({ ...state, dateRange: item })
  }

  // handle apply filters 
  const handleApplyFilter = () => {
    let args = removeEmptyValues(filter)
    if (state?.dateRange) {
      getData(args, setLoading, filter?.filterType);
    }
    else {
      const [startDate, endDate] = filter?.filterType?.split(",")
      getData(args, setLoading, "DATE_RANGE", startDate, endDate);
    }
    setState((prevState: any) => ({
      ...prevState,
      showDrawer: false
    }))
  }

  // Handle Reset filters 
  const handleResetFilter = () => {
    let args = removeEmptyValues(filter)
    args.departmentId = undefined;
    args.currentDate = '';
    args.filterType = "";
    args.startDate = "";
    args.endDate = '';
    args.payrollStartDate = undefined;
    args.payrollEndDate = undefined;
    getData(args, setLoading)
    setFilter({
      ...filter,
      departmentId: undefined,
      currentDate: '',
      filterType: "",
      startDate: "",
      endDate: '',
      payrollStartDate: undefined,
      payrollEndDate: undefined,
    })
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
                    value={filter.departmentId}
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
                    value={filter.filterType?.toLowerCase()?.replace("_", " ")}
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
                        setFilter((prevState: any) => ({ ...prevState, payrollStartDate: startDate }));
                      }}
                      value={filter.payrollStartDate}
                      picker="month"
                    />
                  </div>
                  <div className="flex-col w-full">
                    <p>To</p>
                    <DatePicker
                      suffixIcon={<img src={CalendarIcon} alt="calander" />}
                      onChange={(date: any) => {
                        const endDate = date.endOf('month');
                        setFilter((prevState: any) => ({ ...prevState, payrollEndDate: endDate }));
                      }}
                      placeholder="Select"
                      picker="month"
                      value={filter.payrollEndDate}
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
                downloadPdfOrCsv(event, csvAllColum, newPayrollData, "Company Admin Payroll")
              }}
            />
          </div>
        </Col>
        <Col xs={24}>
          {
            state.isToggle ?
              <BoxWrapper>
                {payrollData?.length === 0 ? <NoDataFound /> : <GlobalTable
                  columns={columns}
                  tableData={newPayrollData}
                  loading={loading}
                  pagination={tableParams?.pagination}
                  pagesObj={allPayrollData?.pagination}
                  handleTableChange={handleTableChange}
                />}
              </BoxWrapper> :
              <div className="flex flex-row flex-wrap max-sm:flex-col">
                {
                  payrollData?.length === 0 ? <NoDataFound /> : payrollData?.map((items: any, index: number) => {
                    const monthFrom = dayjs(items?.from)?.format("MMM")
                    const monthTo = dayjs(items?.to)?.format("MMM")
                    return (
                      <AttendanceCardDetail
                        key={items.id}
                        index={1}
                        item={{
                          key: index,
                          avatar: <Avatar size='large' src={`${constants.MEDIA_URL}/${items?.imageUrl?.mediaId}.${items?.imageUrl?.metaData?.extension}`}>
                            {`${items?.internName?.charAt(0)}`}
                          </Avatar>,
                          name: <span className="text-center w-[200px] sm:w-[250px] xl:w-[330px] text-ellipsis overflow-hidden whitespace-nowrap">{items.internName}</span>,
                          profession: items?.department,
                        }}
                        payrollCycle={`${monthFrom} - ${monthTo}`}
                        menu={
                          <Menu>
                            <Menu.Item
                              onClick={() =>
                                navigate(`/${ROUTES_CONSTANTS.PAYROLL_DETAILS}`, { state: { payrollId: items.payrollId, internData: items } })}
                            >
                              View Details
                            </Menu.Item>
                          </Menu>
                        }
                      />
                    )
                  })}
              </div>
          }
        </Col>
      </Row>
    </div>
  );
};

export default Payroll;

