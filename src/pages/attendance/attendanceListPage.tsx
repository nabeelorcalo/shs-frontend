import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Row, Col } from "antd";
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
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import Drawer from "../../components/Drawer";
import { useRecoilValue } from "recoil";
import { currentUserRoleState, employeeAttData } from "../../store";
import "./style.scss";

const Detail = () => {
  const action = useCustomHook();
  const role = useRecoilValue(currentUserRoleState);
  const AttendanceData = useRecoilValue(employeeAttData)

  const statusOption: any = ["All", "Present", "Absent", "Leave"];
  const attendanceListBreadCrumb = [
    { name: "Attendance Details" },
    { name: role === constants.COMPANY_ADMIN && "Attendance", onClickNavigateTo: `/${ROUTES_CONSTANTS.ATTENDANCE}` },
  ];
  const timeFrameOptions = [
    "Select",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "Date Range",
  ];

  const departmentOptions = [
    "All",
    "Design",
    "Business Analyst",
    "Data Scientist",
    "Product Manager",
    "Developer",
  ];


  const tableColumns = ['Id', 'Name', 'Avatar', 'Profession', 'Status'];
  // const tableColumns = [
  //   { header: 'Id', dataKey: 'id' },
  //   { header: 'Name', dataKey: 'name' },
  //   { header: 'Avatar', dataKey: 'avatar', width: 20, cellRenderer: renderAvatar },
  //   { header: 'Profession', dataKey: 'profession' },
  //   { header: 'Status', dataKey: 'status' },
  // ];

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`1`}>View Details</Link>
      </Menu.Item>
    </Menu>
  );

  const [state, setState] = useState({
    currentDate: dayjs().locale("en"),
    openSidebar: false,
    status: "Select",
    timeFrameVal: "Select",
    departmentVal: "Select",
    isToggle: false,
  });
  const [search, setSearch] = useState(undefined);

  useEffect(()=>{
    getEmployeeAtt(search);
    modifyTableData();
  }, [search]);

  let tableData: any[] = [];
  const modifyTableData = () => {
    if(AttendanceData && AttendanceData.length !== 0) {
      interface attData {
        id: number,
        name: string,
        avatar: string,
        profession: string,
        company?: string,
        status: string,
      };
      tableData = [];
      AttendanceData.map((item: any, index: any) => {
        console.log(item);
        
        const atData: attData = {
          id: 1,
          name: '',
          avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
          profession: '',
          company: '',
          status: '',
        }
        atData.id = item.internId || 22;
        atData.name = item?.userName || 'N/A';
        atData.avatar = `${constants.MEDIA_URL}/${item?.user?.profileImage?.mediaId}.${item?.user?.profileImage?.metaData?.extension}`;
        atData.profession = item?.department || 'N/A';
        atData.company = item?.company || 'N/A';
        atData.status = item?.attendanceStatus;
        tableData.push(atData);
      });
      
    }
    console.log(tableData);
  };
  modifyTableData();

  const getEmployeeAtt = async (search?: string) => {
    await action.getAttAllEmplyoees(search);
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
      status: value,
    }));
  };

  const departmentSelection = (event: any) => {
    const value = event.target.innerText;

    setState((prevState) => ({
      ...prevState,
      departmentVal: value,
    }));
  };

  const onApplyFilterClick = () => {
    // alert("Apply Filter");
  };

  const onResetFilterClick = () => {
    // alert("Reset Filter");
    setState((prevState) => ({
      ...prevState,
      departmentVal: '',
      status: '',
      timeFrameVal: ''
    }));
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

                <div className="flex flex-col my-2 gap-2">
                  <p className="sidebar-label">Department</p>
                  <DropDown
                    name="Select"
                    options={departmentOptions}
                    setValue={() => departmentSelection(event)}
                    value={state.departmentVal}
                  />
                </div>
                {role === constants.UNIVERSITY && (
                  <div className="flex flex-col my-2 gap-2">
                    <p className="sidebar-label">Company</p>
                    <DropDown
                      name="Select"
                      options={departmentOptions}
                      setValue={() => departmentSelection(event)}
                      value={state.departmentVal}
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
      <div className={`attendance-card  my-4  ${state.isToggle ? "flex flex-col gap-4" : "shs-row"}`} >
        {tableData.length !== 0 && tableData.map((item, index) => {
          return state.isToggle ? (
            <div className="mt-5"><AttendanceListViewCard item={item} index={index} menu={menu} key={item.id} /></div>
          ) : (
            <>
              <AttendanceCardDetail item={item} index={index} menu={menu} key={item.id} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
