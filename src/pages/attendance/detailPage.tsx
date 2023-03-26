import { useState } from "react";
import { Avatar, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  ClockInCommon,
  ClockOutCommon,
  AvgHoursCommon,
  WorkingDaysCommon,
  DownlaodFileIcon,
  EmailImg,
  LocationImg,
  PhoneIcon
} from "../../assets/images";
import {
  BoxWrapper,
  DropDown,
  IconButton,
  PageHeader,
  AttendanceTimeCard,
  GlobalTable,
  ProfileCard
} from "../../components";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import "./style.scss";

const Detail = () => {

  const timeFrameOptions = [
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'Date Range'
  ];

  const tableColumns = [
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Mood',
      key: 'mood',
      render: (_: any, data: any) => {
        return (
          <Space size="middle">

          </Space>
        )
      },
    },
    {
      title: 'Clock In',
      key: 'clockIn',
      dataIndex: 'clockIn',
    },
    {
      title: 'Clock Out',
      key: 'clockOut',
      dataIndex: 'clockOut',
    },
    {
      title: 'Total Hours',
      key: 'totalHours',
      dataIndex: 'totalHours',
    }
  ];

  const tableData = [
    {
      date: "Thu, 29 September 2022",
      mood: 1,
      clockIn: "09:01",
      clockOut: "17:23",
      totalHours: "8:20 hr",
    },
    {
      date: "Thu, 29 September 2022",
      mood: 1,
      clockIn: "09:01",
      clockOut: "17:23",
      totalHours: "8:20 hr",
    },
    {
      date: "Thu, 29 September 2022",
      mood: 1,
      clockIn: "09:01",
      clockOut: "17:23",
      totalHours: "8:20 hr",
    },
    {
      date: "Thu, 29 September 2022",
      mood: 1,
      clockIn: "09:01",
      clockOut: "17:23",
      totalHours: "8:20 hr",
    },
    {
      date: "Thu, 29 September 2022",
      mood: 1,
      clockIn: "09:01",
      clockOut: "17:23",
      totalHours: "8:20 hr",
    },
  ]

  const [state, setState] = useState({
    timeFrameVal: 'This Month',
    timeData: [
      { id: 0, heading: "Avg Clock In", time: "08:04am" },
      { id: 1, heading: "Avg Clock Out", time: "03:04pm" },
      { id: 2, heading: "Avg Hours", time: "05:48hrs" },
      { id: 3, heading: "Working Days", time: "24" },
    ]
  });

  const breadCrumbs = () => {
    const role = constants.USER_ROLE;

    switch (role) {
      case 'Manager':
        return (
          <Link
            className="bread-crumb"
            to={`/${ROUTES_CONSTANTS.ATTENDANCE}`}
          >
            Attendance
          </Link>
        );
      case 'CompanyAdmin':
        return (
          <>
            <Link
              className="bread-crumb"
              to={`/${ROUTES_CONSTANTS.ATTENDANCE}`}
            >
              Attendance
            </Link>
            /
            <Link
              className="bread-crumb"
              to={`/${ROUTES_CONSTANTS.ATTENDANCE}/${ROUTES_CONSTANTS.DETAIL}`}
            >
              Attendance Details
            </Link>
          </>
        );
      default:
        return <></>;
    }
  }

  const timeFrameSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      timeFrameVal: value,
    }));
  }

  const downloadClick = () => {

  }

  const getColorAndIcon = (name: string) => {
    let color: string;
    let icon: any;

    switch (name) {
      case 'Avg Clock In':
        color = "#4A9D77";
        icon = <ClockInCommon />
        return { color, icon };
      case 'Avg Clock Out':
        color = "#E95060";
        icon = <ClockOutCommon />
        return { color, icon };
      case 'Avg Hours':
        color = "#4783FF";
        icon = <AvgHoursCommon />
        return { color, icon };
      case 'Working Days':
        color = "#FFC15D";
        icon = <WorkingDaysCommon />
        return { color, icon };
      default:
        return '';
    }
  }

  return (
    <div className="company-admin-detail-container">
      <PageHeader
        title={
          <div className="font-medium">
            {
              constants.USER_ROLE === "Intern" ?
                "Attendance"
                :
                "Mino Marina"
            }
            {
              constants.USER_ROLE === "Intern" ?
                <></>
                :
                <span className="vertical-line">
                  {breadCrumbs()}
                </span>
            }
          </div>
        }

        children={
          <div className="flex flex-row gap-4">
            <DropDown
              name="time-frame"
              options={timeFrameOptions}
              setValue={() => timeFrameSelection(event)}
              value={state.timeFrameVal}
              showDatePickerOnVal='Date Range'
              requireDatePicker
              placement='bottomRight'
            />

            <IconButton
              size='large'
              className='icon-btn download-btn'
              onClick={downloadClick}
              icon={<DownlaodFileIcon />}
            />
          </div>
        }
        actions
        bordered
      />

      <div className="attendance-content">
        <div className="left-container">
          <ProfileCard
            name="Mino Marina"
            profession="Data Researcher"
            email="minomarina@gmail.com"
            phone="+44 7700 900077"
            address="263 Eversholt St, London NW11NB, UK"
            avatar="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
          />
        </div>

        <div className="right-conainer">
          <BoxWrapper className="flex mb-6">
            {
              state.timeData.map((item: any, index) => {
                const { color, icon }: any = getColorAndIcon(item.heading);

                return (
                  <AttendanceTimeCard
                    Icon={icon}
                    heading={item.heading}
                    time={item.time}
                    colorClass={color}
                    isLast={index === state.timeData.length - 1}
                  />
                )
              })
            }
          </BoxWrapper>

          <BoxWrapper>
            <GlobalTable
              pagination={false}
              columns={tableColumns}
              tableData={tableData}
              expandable={{
                expandedRowRender: () => { },
                rowExpandable: function noRefCheck() { }
              }}
            />
          </BoxWrapper>
        </div>
      </div>
    </div>
  )
}

export default Detail;