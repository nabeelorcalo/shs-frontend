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
  ToggleButton
} from "../../components";
import {
  CardViewIcon,
  DownlaodFileIcon,
  GlassMagnifier,
  TableViewIcon,
} from "../../assets/images";
import { ROUTES_CONSTANTS } from "../../config/constants";
import Drawer from "../../components/Drawer";
import "./style.scss";

const Detail = () => {

  const statusOption: any = [
    "All",
    "Present",
    "Absent",
    "Leave"
  ];

  const timeFrameOptions = [
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'Date Range'
  ];

  const departmentOptions = [
    'Design',
    'Business Analyst',
    'Data Scientist',
    'Product Manager',
    'Developer'
  ];

  const dummyData = [
    { id: 1, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Data Researcher', status: 'present' },
    { id: 2, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Designer', status: 'leave' },
    { id: 3, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Business Analyst', status: 'present' },
    { id: 4, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Data Researcher', status: 'present' },
    { id: 5, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Data Researcher', status: 'present' },
    { id: 6, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Data Researcher', status: 'present' },
    { id: 7, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Data Researcher', status: 'absent' },
    { id: 8, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Data Scientist', status: 'present' },
    { id: 9, name: 'Mino Marina', avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png', profession: 'Data Researcher', status: 'present' },
  ];

  const menu = (
    <Menu>
      <Menu.Item>
        <Link
          to={`${ROUTES_CONSTANTS.DETAIL}`}
        // className="attendance-detail-btn"
        >
          View Details
        </Link>
      </Menu.Item>
    </Menu>
  );


  const [state, setState] = useState({
    currentDate: dayjs().locale('en'),
    openSidebar: false,
    status: 'Select',
    timeFrameVal: 'Select',
    departmentVal: 'Select',
    isToggle: false,
  });

  const breadCrumbs = () => {
    return (
      <Link
        className="bread-crumb"
        to={`/${ROUTES_CONSTANTS.ATTENDANCE}`}
      >
        Attendance
      </Link>
    )
  }

  const changeMonth = (event: any) => {
    let newDate: any;
    let btn = event.target.parentElement.name ?
      event.target.parentElement.name :
      event.target.name ?
        event.target.name :
        event.target.parentElement.parentElement.name;

    if (btn === "next")
      newDate = state.currentDate.add(1, 'day');
    else if (btn === "prev")
      newDate = state.currentDate.subtract(1, 'day');

    setState(prevState => ({
      ...prevState,
      currentDate: newDate,
    }));
  }

  const handleSidebarClick = () => {
    setState(prevState => ({
      ...prevState,
      openSidebar: !state.openSidebar,
    }));
  }

  const downloadClick = () => {

  }

  const statusSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      status: value,
    }));
  }

  const timeFrameSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      timeFrameVal: value,
    }));
  }

  const departmentSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      departmentVal: value,
    }));
  }

  const onApplyFilterClick = () => {
    alert('Apply Filter')
  }

  const onResetFilterClick = () => {
    alert('Reset Filter')
  }

  const togglerClick = (event: any) => {
    setState(prevState => ({
      ...prevState,
      isToggle: !state.isToggle,
    }));
  }

  return (
    <div className="attendance-detail-container">
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            Attendance Detail
            <span className="vertical-line">
              {breadCrumbs()}
            </span>
          </div>
        }
        actions
        children={
          <MonthChanger
            month={state.currentDate.format('ddd, DD MMMM YYYY')}
            onClick={() => changeMonth(event)}
            datePickerClassName="min-w-0"
            hasDatePicker
          />
        }
      />

      <div className="flex">
        <div className="w-[28%]">
          <SearchBar
            className=""
            handleChange={() => { }}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="search"
            size="middle"
          />
        </div>

        <div className="flex justify-center ml-auto gap-4">
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
                    setValue={() => timeFrameSelection(event)}
                    value={state.timeFrameVal}
                    showDatePickerOnVal='Date Range'
                    requireDatePicker
                    placement='topLeft'
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

          <ToggleButton 
            isToggle = {state.isToggle}
            onTogglerClick={togglerClick}
            FirstIcon={CardViewIcon}
            LastIcon={TableViewIcon}
            className="w-[88px]"
          />

          <IconButton
            size='large'
            className='icon-btn download-btn'
            onClick={downloadClick}
            icon={<DownlaodFileIcon />}
          />
        </div>
      </div>

      <div
        className={
          `attendance-card
          ${state.isToggle ?
            'flex flex-col gap-2'
            :
            'shs-row'
          }`
        }
      >
        {dummyData.map((item, index) => {
          return (
            state.isToggle ?
              <AttendanceListViewCard item={item} index={index} menu={menu} />
              :
              <AttendanceCardDetail item={item} index={index} menu={menu} />
          )
        })}
      </div>
    </div >
  )
}

export default Detail;