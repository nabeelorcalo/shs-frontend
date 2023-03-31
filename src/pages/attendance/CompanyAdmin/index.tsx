import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd/es/grid";
import dayjs from "dayjs";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { PageHeader, AttendanceCard, AttendanceAndListingGraph, DropDown, MonthlyPerfomanceChart, TopPerformanceList, BoxWrapper } from "../../../components";
import { Absent, AbsentIntern, PeopleIcon, PresentInterns } from "../../../assets/images";
import { AttendanceDepartmentData } from "../../../components/ChartsOfGraphs/chartsMockData/AttendanceDepartmentData";
import "./style.scss";

const CompanyAdminAttendance = () => {
  const [state, setState] = useState({
    graphSelectedMonth: dayjs().format('MMMM'),
    cardsData: [
      { name: "Interns", count: 211 },
      { name: "Present", count: 111 },
      { name: "Leave", count: 48 },
      { name: "Absent", count: 52 }
    ],
    attendanceList: [
      {
        id: 0,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        isLate: false,
        checkInTime: '08:04',
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 1,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        isLate: false,
        checkInTime: '08:04',
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 2,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        isLate: true,
        checkInTime: '08:20',
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 3,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        isLate: false,
        checkInTime: '08:04',
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 4,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        isLate: false,
        checkInTime: '08:04',
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 5,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        isLate: false,
        checkInTime: '08:04',
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 6,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        isLate: false,
        checkInTime: '08:04',
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 7,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        isLate: true,
        checkInTime: '08:16',
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 8,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        isLate: false,
        checkInTime: '08:04',
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
    ]
  });

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Novemeber',
    'Decemebr'
  ];

  const cardIcon = (name: string) => {
    switch (name) {
      case 'Interns':
        return <PeopleIcon />;
      case 'Present':
        return <PresentInterns />;
      case 'Leave':
        return <AbsentIntern />;
      case 'Absent':
        return <Absent />;
      default:
        return <></>;
    }
  }

  const onMonthChange = (event: any) => {
    const monthName = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      graphSelectedMonth: monthName,
    }));
  }

  return (
    <div className="company-admin-attendance-container">
      <PageHeader title="Attendance" actions bordered >
        <Link to={`${ROUTES_CONSTANTS.DETAIL}`} className="attendance-detail-btn" >
          Attendance Details
        </Link>
      </PageHeader>
      <Row gutter={[20, 20]}>
        {
          state.cardsData.map((item: any) => {
            return (
              <Col xxl={6} xl={6} md={12} sm={24} xs={24}>
                <AttendanceCard
                  title={item.name}
                  count={item.count}
                  avatar={cardIcon(item.name)}
                />
              </Col>
            )
          })
        }
        <Col xxl={16} xl={16} md={24} xs={24}>
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <AttendanceAndListingGraph
                title="Attendance Overview"
                graphName="attendance"
                level={4}
              />
            </Col>
            <Col xs={24}>
              <MonthlyPerfomanceChart
                data={AttendanceDepartmentData}
                heading={"Attendance By department"}
                color={['#4A9D77', '#E95060', '#FFC15D']}
                columnStyle={{ radius: [5, 5, 0, 0] }}
                columnWidthRatio={.5}
                children={
                  <div className="ml-auto">
                    <DropDown
                      name="Select"
                      options={months}
                      setValue={() => onMonthChange(event)}
                      value={state.graphSelectedMonth}
                      placement="bottomCenter"
                    />
                  </div>
                }
              />
            </Col>
          </Row>
        </Col>
        <Col xxl={8} xl={8} md={24} xs={24}>
          <TopPerformanceList
            heading="Today's Attendance"
            data={state.attendanceList}
          />
        </Col>
      </Row>

      {/* <div className="attendance-detail-container" > */}
        {/* <div className="left-container"> */}
          {/* <AttendanceAndListingGraph
            title="Attendance Overview"
            graphName="attendance"
            level={4}
          /> */}
          {/* <MonthlyPerfomanceChart
            data={AttendanceDepartmentData}
            heading={"Attendance By department"}
            color={['#4A9D77', '#E95060', '#FFC15D']}
            columnStyle={{ radius: [5, 5, 0, 0] }}
            columnWidthRatio={.5}
            children={
              <div className="ml-auto">
                <DropDown
                  name="Select"
                  options={months}
                  setValue={() => onMonthChange(event)}
                  value={state.graphSelectedMonth}
                  placement="bottomCenter"
                />
              </div>
            }
          /> */}
        {/* </div> */}
        {/* <div className="right-container"> */}
          {/* <TopPerformanceList
            heading="Today's Attendance"
            data={state.attendanceList}
          /> */}
        {/* </div> */}
      {/* </div> */}
    </div>
  )
}

export default CompanyAdminAttendance;