import { Avatar, Typography } from "antd";
import { useState } from "react";
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
  AttendanceTimeCard
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
      case 'Intern':
      case 'Manager':
        return (
          <Link
            className="bread-crumb"
            to={`/${ROUTES_CONSTANTS.PERFORMANCE}`}
          >
            Performance
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
        return {color, icon};
      case 'Avg Clock Out':
        color = "#E95060";
        icon = <ClockOutCommon />
        return {color, icon};
      case 'Avg Hours':
        color = "#4783FF";
        icon = <AvgHoursCommon />
        return {color, icon};
      case 'Working Days':
        color = "#FFC15D";
        icon = <WorkingDaysCommon />
        return {color, icon};
      default:
        return '';
    }
  }

  return (
    <div className="company-admin-detail-container">
      <PageHeader
        title={
          <div className="font-medium">
            Mino Marina
            <span className="vertical-line">
              {breadCrumbs()}
            </span>
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
              placement='topLeft'
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
          <BoxWrapper className="flex flex-col w-full">
            <Avatar
              size={64}
              className="m-auto"
              src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
            />

            <Typography.Title
              className="m-auto"
              level={3}
            >
              Mino Marina
            </Typography.Title>

            <Typography.Text
              className="m-auto"
            >
              Data Researcher
            </Typography.Text>

            <div className="user-detail">
              <div className="flex flex-row gap-4">
                <EmailImg />
                <p className="text-sm">
                  minomarina@gmail.com
                </p>
              </div>

              <div className="flex flex-row gap-4">
                <PhoneIcon />
                <p className="text-sm">
                  +44 7700 900077
                </p>
              </div>

              <div className="flex flex-row gap-4">
                <LocationImg />
                <p className="text-sm">
                  263 Eversholt St, London NW11NB, UK
                </p>
              </div>
            </div>

            <Link
              to={`/${ROUTES_CONSTANTS.ATTENDANCE}`}
              className="profile-btn"
            >
              View Profile
            </Link>
          </BoxWrapper>
        </div>

        <div className="right-conainer">
          <BoxWrapper className="flex">
            {
              state.timeData.map((item: any, index) => {
                const {color, icon}: any = getColorAndIcon(item.heading);

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
        </div>
      </div>
    </div>
  )
}

export default Detail;