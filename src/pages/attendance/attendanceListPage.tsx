import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import dayjs from "dayjs";
import {
  Button,
  DropDown,
  FiltersButton,
  IconButton,
  MonthChanger,
  PageHeader,
  SearchBar,
  AttendanceCardDetail,
  AttendanceListViewCard,
  ToggleButton,
} from "../../components";
import {
  CardViewIcon,
  DownlaodFileIcon,
  GlassMagnifier,
  TableViewIcon,
} from "../../assets/images";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import Drawer from "../../components/Drawer";
import "./style.scss";

const Detail = () => {
  const role = constants.USER_ROLE;
  const statusOption: any = ["All", "Present", "Absent", "Leave"];

  const timeFrameOptions = [
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "Date Range",
  ];

  const departmentOptions = [
    "Design",
    "Business Analyst",
    "Data Scientist",
    "Product Manager",
    "Developer",
  ];

  const dummyData = [
    {
      id: 1,
      name: "Mino Marina",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      profession: "Data Researcher",
      company: role === "University" && "Orcalo Holdings",
      status: "present",
    },
    {
      id: 2,
      name: "Mino Marina",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      profession: "Designer",
      company: role === "University" && "Orcalo Holdings",
      status: "leave",
    },
    {
      id: 3,
      name: "Mino Marina",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      profession: "Business Analyst",
      company: role === "University" && "Orcalo Holdings",
      status: "present",
    },
    {
      id: 4,
      name: "Mino Marina",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      profession: "Data Researcher",
      company: role === "University" && "Orcalo Holdings",
      status: "present",
    },
    {
      id: 5,
      name: "Mino Marina",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      profession: "Data Researcher",
      company: role === "University" && "Orcalo Holdings",
      status: "present",
    },
    {
      id: 6,
      name: "Mino Marina",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      profession: "Data Researcher",
      company: role === "University" && "Orcalo Holdings",
      status: "present",
    },
    {
      id: 7,
      name: "Mino Marina",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      profession: "Data Researcher",
      company: role === "University" && "Orcalo Holdings",
      status: "absent",
    },
    {
      id: 8,
      name: "Mino Marina",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      profession: "Data Scientist",
      company: role === "University" && "Orcalo Holdings",
      status: "present",
    },
    {
      id: 9,
      name: "Mino Marina",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      profession: "Data Researcher",
      company: role === "University" && "Orcalo Holdings",
      status: "present",
    },
  ];

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

  const breadCrumbs = () => {
    return (
      <Link className="bread-crumb" to={`/${ROUTES_CONSTANTS.ATTENDANCE}`}>
        Attendance
      </Link>
    );
  };

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

  const downloadClick = () => {};

  const statusSelection = (event: any) => {
    const value = event.target.innerText;

    setState((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  const timeFrameSelection = (event: any) => {
    const value = event.target.innerText;

    setState((prevState) => ({
      ...prevState,
      timeFrameVal: value,
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
    alert("Apply Filter");
  };

  const onResetFilterClick = () => {
    alert("Reset Filter");
  };

  const togglerClick = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      isToggle: !state.isToggle,
    }));
  };

  return (
    <div className="attendance-detail-container">
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            {constants.USER_ROLE === "CompanyAdmin"
              ? "Attendance Detail"
              : "Attendance"}
            {constants.USER_ROLE === "CompanyAdmin" ? (
              <span className="vertical-line">{breadCrumbs()}</span>
            ) : (
              <></>
            )}
          </div>
        }
        actions
        children={
          <MonthChanger
            month={state.currentDate.format("ddd, DD MMMM YYYY")}
            onClick={() => changeMonth(event)}
            datePickerClassName="min-w-0"
            hasDatePicker
          />
        }
      />
      <div className="flex attendance-main-header">
        <div className="w-[28%] search-bar" >
          <SearchBar
            handleChange={() => { }}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="Search"
          />
        </div>
        <div className="flex attendance-filter-section  ml-auto gap-4">
          <div className="filter-btn">
            <FiltersButton
              label="Filters"
              onClick={handleSidebarClick}
            />
          </div>
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
                    setValue={() => timeFrameSelection(event)}
                    value={state.timeFrameVal}
                    showDatePickerOnVal="Date Range"
                    requireDatePicker
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
                {role === "University" && (
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
          <IconButton
            size='large'
            className='icon-btn download-btn'
            onClick={downloadClick}
            icon={<DownlaodFileIcon />}
          />
          <ToggleButton
            isToggle={state.isToggle}
            onTogglerClick={togglerClick}
            FirstIcon={CardViewIcon}
            LastIcon={TableViewIcon}
            className="w-[88px]"
          />
        </div>
      </div>

      <div
        className={`attendance-card my-4
          ${state.isToggle ? "flex flex-col gap-4" : "shs-row"}`}
      >
        {dummyData.map((item, index) => {
          return state.isToggle ? (
            <AttendanceListViewCard item={item} index={index} menu={menu} />
          ) : (
            <AttendanceCardDetail item={item} index={index} menu={menu} />
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
