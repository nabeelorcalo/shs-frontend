import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Col, Form, Avatar } from "antd";
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs";
import {
  Button,
  DropDown,
  FiltersButton,
  MonthChanger,
  PageHeader,
  SearchBar,
  AttendanceCardDetail,
  AttendanceListViewCard,
  ToggleButton,
  Breadcrumb,
  Notifications,
} from "../../components";
import {
  CardViewIcon,
  GlassMagnifier,
  TableViewIcon,
} from "../../assets/images";
import useCustomHook from './actionHandler';
import useCustomDashboardHook from '../dashboard/actionHandler';
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import Drawer from "../../components/Drawer";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserRoleState, employeeAttData, filterDataAtt, universityCompaniesState } from "../../store";
import "./style.scss";
import UserSelector from "../../components/UserSelector";
import { GlobalTable } from '../../components/Table/index';

const Detail = () => {
  const action = useCustomHook();
  const actionDashboard = useCustomDashboardHook();
  const role = useRecoilValue(currentUserRoleState);
  const AttendanceData = useRecoilValue(employeeAttData);
  const navigate = useNavigate();
  const statusOption: any = ["All", "Present", "Absent", "Leave"];
  const attendanceListBreadCrumb = [
    { name: "Attendance Details" },
    { name: role === constants.COMPANY_ADMIN && "Attendance", onClickNavigateTo: `/${ROUTES_CONSTANTS.ATTENDANCE}` },
  ];
  const timeFrameOptions = [
    "Select",
    "Daily",
    "This Week",
    // "Last Week",
    "This Month",
    // "Last Month",
    "This Year",
    "Date Range",
  ];

  const tableColumns = ['Id', 'Name', 'Avatar', 'Profession', 'Status'];
  const detailedTableCol = [
    {
      title: "No",
      key: "no",
      dataIndex: "no",
    },
    {
      title: "Avatar",
      key: "avatar",
      render: (_: any, data: any) => (
        <Avatar size={48} src={data.avatar} />
      ),
      dataIndex: "avatar",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Company",
      key: "company",
      dataIndex: "company",
    },
    {
      title: "Department",
      key: "department",
      dataIndex: "department",
    },

    {
      title: "Days Worked",
      key: "daysWorked",
      dataIndex: "daysWorked",
    },
    {
      title: "Avg Clock-In",
      key: "clockIn",
      dataIndex: "clockIn",
    },
    {
      title: "Avg Clock-Out",
      key: "clockOut",
      dataIndex: "clockOut",
    },
    {
      title: "Average Hours",
      key: "totalHours",
      dataIndex: "totalHours",
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, data: any) => (
        <a onClick={()=>navigate(`${data.id}`)}>View Details</a>
      ),
  },
  ];

  const [state, setState] = useState({
    currentDate: dayjs().locale("en"),
    openSidebar: false,
    status: "Select",
    timeFrameVal: "Select",
    department: undefined,
    isToggle: false,
    companyId: undefined,
    companyOptions: [],
    departmentOptions: [],
  });
  const [search, setSearch] = useState(undefined);

  useEffect(()=>{
    getEmployeeAtt(search);
    modifyTableData();
    if(role === constants.UNIVERSITY) getCompanyData();
    if(role === constants.MANAGER) getDepartmentData();
    
  }, [search]);

  const getCompanyData = async () => {
    const companyData = await actionDashboard.getAllCompaniesData();
    let companyOption: any = [{value: 'all', label: 'All'}];
    if(companyData.length !== 0) {
      companyData.map((item: any, index: any) => {
        let company: any = {};
        company.key = index + 1;
        company.value = item.companyId,
        company.label = item.title,
        companyOption.push(company);
      }
    )};
    setState({...state, companyOptions: companyOption});
  }

  const getDepartmentData = async () => {
    const depData = await action.getDepartmentList();
    const depOption: any = [{key: 0, value: 'all', label: 'All'}, ...depData];
    setState({...state, departmentOptions: depOption});
  }

  let tableData: any[] = [];
  let tableDetailsData: any[] = [];

  const modifyTableData = () => {
    if(AttendanceData && AttendanceData.length !== 0) {
      if(state.timeFrameVal && state.timeFrameVal !== 'Select') {
        interface attDetailData {
          no: number,
          id: number,
          name: string,
          avatar: string,
          company?: string,
          department: string,
          daysWorked: string,
          clockOut: string,
          clockIn: string,
          totalHours: string,
        };
        tableDetailsData = [];
        AttendanceData?.map((item: any, index: any) => {
          const atData: attDetailData = {
            no: index + 1,
            id: 1,
            name: '',
            avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',            
            department: '',
            daysWorked: '',
            clockOut: '',
            clockIn: '',
            totalHours: '',
          }
          atData.id = item?.internId;
          atData.name = `${item?.userDetails?.firstName} ${item?.userDetails?.lastName}` || 'N/A';
          atData.avatar = item?.userDetails?.profileImage ? 
          `${constants.MEDIA_URL}/${item?.userDetails?.profileImage?.mediaId}.${item?.userDetails?.profileImage?.metaData?.extension}`
            : `https://eu.ui-avatars.com/api/?name=${item?.userDetail?.firstName} ${item?.userDetail?.lastName}&size=250` ;
          atData.department = item?.department || 'N/A';
          atData.company = item?.company || 'N/A';
          atData.daysWorked = item?.daysWorked || '0';
          atData.totalHours = item?.avgWorkingHours || '0';
          atData.clockIn = item?.avgClockIn || '0';
          atData.clockOut = item?.avgClockOut || '0';
          tableDetailsData.push(atData);
        });
      }
      if(!state.timeFrameVal || state.timeFrameVal === 'Select') {
        interface attData {
          id: number,
          name: string,
          avatar: string,
          profession: string,
          companyDetails?: Object,
          status: string,
        };
        tableData = [];
        AttendanceData?.map((item: any, index: any) => {
          const atData: attData = {
            id: 1,
            name: '',
            avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
            // avatar: '',
            profession: '',
            companyDetails: {},
            status: '',
          }
          atData.id = item?.internId;
          atData.name = item?.userName || 'N/A';
          atData.avatar = item?.user?.profileImage ? `${constants.MEDIA_URL}/${item?.user?.profileImage?.mediaId}.${item?.user?.profileImage?.metaData?.extension}` : `https://eu.ui-avatars.com/api/?name=${item?.userName}&size=250`;
          atData.profession = item?.department || 'N/A';
          atData.companyDetails = item?.companyDetails || {};
          atData.status = item?.attendanceStatus;
          tableData.push(atData);
        });
      }
    }
  };
  modifyTableData();

  const getEmployeeAtt = async (search?: string | undefined, filter?: object) => {
    await action.getAttAllEmplyoees(search, filter);
  }

  const changeMonth = (event: any) => {
    let newDate: any;
    let btn = event.target.parentElement.name
      ? event.target.parentElement.name
      : event.target.name
        ? event.target.name
        : event.target.parentElement.parentElement.name;

    if (btn === "next") newDate = state.currentDate.add(1, "day");
    else if (btn === "prev") newDate = state.currentDate.subtract(1, "day");

    setState((prevState) => ({
      ...prevState,
      currentDate: newDate,
    }));
  };



  const handleSidebarClick = () => {
    setState((prevState) => ({
      ...prevState,
      openSidebar: !state.openSidebar,
    }));
  };

  const statusSelection = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      status: value.toLowerCase(),
    }));
  };

  const departmentSelection = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      department: event,
    }));
  };

  const companySelection = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      companyId: event,
    }));
  };


  const pick = (object: { [x: string]: any }, keys: any[]): object => {
    return keys.reduce((obj: { [x: string]: any }, key: string | number) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }

  const timeConversion = (timeframe: string) => {
    let currMonth = dayjs().month();
    let currWeek = dayjs().week();
    const dates: {startDate: any, endDate: any} = {startDate: dayjs(), endDate: dayjs()};
    switch(timeframe) {
      case 'Daily': {
        dates.startDate = dayjs().startOf('day').toISOString();
        dates.endDate = dayjs().endOf('day').toISOString();
        break;
      }
      case 'This Month': {
        dates.startDate = dayjs().startOf('month').toISOString();
        dates.endDate = dayjs().endOf('month').toISOString();
        break;
      }
      case 'Last Month': {
        dates.startDate = dayjs().month(currMonth - 1).startOf('month').toISOString();
        dates.endDate = dayjs().month(currMonth - 1).endOf('month').toISOString();
        break;
      }
      case 'This Week': {
        dates.startDate =  dayjs().startOf('week').toISOString();
        dates.endDate =  dayjs().endOf('week').toISOString();
        break;
      }
      case 'This Year': {
        dates.startDate =  dayjs().startOf('year').toISOString();
        dates.endDate =  dayjs().endOf('year').toISOString();
        break;
      }
      case 'Last Week': {
        dates.startDate =  dayjs().week(currWeek - 1).startOf('week').toISOString();
        dates.endDate =  dayjs().week(currWeek - 1).endOf('week').toISOString();
        break;
      }
      default: {
        dates.startDate = dayjs(timeframe?.split(',')[0]).toISOString();
        dates.endDate = dayjs(timeframe?.split(',')[1]).toISOString();
      }
    }
    return dates;
  }

  const onApplyFilterClick = () => {
    const filters: any = pick(state, [
      'companyId',
      'timeFrameVal',
      'status',
      'department'
    ]);
    if(filters['timeFrameVal'] && filters['timeFrameVal'] !== 'Select'){
      const dateRange: {startDate: any, endDate: any} = timeConversion(filters['timeFrameVal']);
      filters['startDate'] = dateRange.startDate;
      filters['endDate'] = dateRange.endDate;
    }
    delete filters['timeFrameVal'];
    if(filters['status'] && (filters['status'] === 'all' || filters['status'] === 'Select')) delete filters['status'];
    if(filters['companyId'] && (filters['companyId'] === 'all' || filters['companyId'] === 'Select')) delete filters['companyId'];
    if(filters['department'] && (filters['department'] === 'all' || filters['department'] === 'Select')) delete filters['department'];
    
    getEmployeeAtt(undefined, filters);
  };

  const onResetFilterClick = () => {
    // alert("Reset Filter");
    setState((prevState) => ({
      ...prevState,
      department: undefined,
      status: '',
      timeFrameVal: ''
    }));
    getEmployeeAtt();
  };

  const togglerClick = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      isToggle: !state.isToggle,
    }));
  };

  // function renderAvatar(cellDataKey: any, cellOptions: any) {
  //   const img = new Image();
  //   img.src = cellDataKey;
  //   img.width = cellOptions.row.raw.avatarWidth;
  //   img.height = cellOptions.row.raw.avatarHeight;
  //   return img;
  // }

  return (
    <div className="attendance-detail-container">
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            {
              (role === constants.UNIVERSITY || role === constants.MANAGER) ?
                <h3 className="primary-color text-2xl font-semibold">Attendance</h3>
                :
                <Breadcrumb breadCrumbData={attendanceListBreadCrumb} />
            }
          </div>
        }
        actions
        children={
          <MonthChanger
            month={state.currentDate.format("ddd, DD MMMM YYYY")}
            onClick={() => changeMonth(event)}
            setState={setState}
            datePickerClassName="min-w-0"
            hasDatePicker
            picker="week"
          />
        }
      />
      <Row gutter={[20,20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar
            handleChange={(e: any) => action.debouncedSearch(e, setSearch)}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="Search"
          />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
            <FiltersButton
              label="Filters"
              onClick={handleSidebarClick}
            />
          <Drawer
            title="Filters"
            open={state.openSidebar}
            onClose={handleSidebarClick}
            children={
              <div className="flex flex-col">
                <div className="flex flex-col my-2 gap-2">
                  <p className="sidebar-label">Status</p>
                  <DropDown
                    name="Select"
                    options={statusOption}
                    setValue={() => statusSelection(event)}
                    value={state.status}
                  />
                </div>
                <div className="flex flex-col my-2 gap-2">
                  <p className="sidebar-label">Time Frame</p>
                  <DropDown
                    name="Select"
                    options={timeFrameOptions}
                    setValue={(e: string) => setState((prevState) => ({
                      ...prevState,
                      timeFrameVal: e,
                    }))}
                    value={state.timeFrameVal}
                    showDatePickerOnVal="Date Range"
                    requireRangePicker
                    placement="topLeft"
                  />
                </div>
                {
                  state.departmentOptions.length !== 0 &&
                    <div className="flex flex-col my-2 gap-2">
                      <p className="sidebar-label">Department</p>
                      <UserSelector
                        placeholder="Select"
                        options={state.departmentOptions}
                        onChange={(event: any) => departmentSelection(event)}
                        // value={state.department}
                      />
                    </div>
                }

                {state.companyOptions.length !== 0 && role === constants.UNIVERSITY && (
                  <div className="flex flex-col my-2 gap-2">
                    <p className="sidebar-label">Company</p>
                    <UserSelector
                      placeholder="Select"
                      onChange={(event:any) => companySelection(event)}
                      // value={}
                      options={state.companyOptions}
                    />
                  </div>
                )}
                <div className="flex ml-auto my-2 gap-2">
                  <Button
                    label="Reset"
                    type="default"
                    onClick={onResetFilterClick}
                    className="border-visible-btn"
                  />

                  <Button
                    label="Apply"
                    onClick={onApplyFilterClick}
                    className="bg-visible-btn"
                  />
                </div>
              </div>
            }
          />
          <div className="flex gap-4 justify-between">
          <ToggleButton
            isToggle={state.isToggle}
            onTogglerClick={togglerClick}
            FirstIcon={CardViewIcon}
            LastIcon={TableViewIcon}
            className="w-[88px]"
          />
          <DropDown
            options={[
              'pdf',
              'excel' 
            ]}
            requiredDownloadIcon
            setValue={() => {
              action.downloadPdfOrCsv(event, tableColumns, tableData, "Attendance Detail");
              Notifications({ title: 'Success', description: 'List Download', type: 'success' })
            }}
          />
          </div>
        </Col>
      </Row>
      <div className={`attendance-card  my-4  ${state.isToggle ? "flex flex-col gap-4" : ""}`} >
        {(state.timeFrameVal && state.timeFrameVal !== 'Select' && tableDetailsData.length !== 0) ?
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
            <GlobalTable 
              columns={detailedTableCol}
              tableData={tableDetailsData}
            />
          </div>
        :
        <>
          {tableData.length !== 0 && tableData.map((item, index) => {
            return state.isToggle ? (
              <div className="mt-5">
                <AttendanceListViewCard
                  item={item}
                  index={index}
                  menu={
                    <Menu>
                      <Menu.Item
                        onClick={() => navigate(`${item.id}`)}
                      >
                        View Details
                      </Menu.Item>
                    </Menu>
                  }
                  key={item.id} 
                />
              </div>
            ) : (
              <>
                <AttendanceCardDetail 
                  item={item} 
                  index={index} 
                  menu={
                    <Menu>
                      <Menu.Item
                        onClick={() => navigate(`${item.id}`)}
                      >
                        View Details
                      </Menu.Item>
                    </Menu>
                  }
                  key={item.id} />
              </>
            );
          })}
        </>
        }
      </div>
    </div>
  );
};

export default Detail;
