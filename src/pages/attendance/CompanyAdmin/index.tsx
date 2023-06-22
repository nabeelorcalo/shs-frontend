import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd/es/grid";
import dayjs from "dayjs";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { PageHeader, AttendanceCard, AttendanceAndListingGraph, DropDown, MonthlyPerfomanceChart, TopPerformanceList } from "../../../components";
import { Absent, AbsentIntern, PeopleIcon, PresentInterns } from "../../../assets/images";
import { AttendanceDepartmentData } from "../../../components/ChartsOfGraphs/chartsMockData/AttendanceDepartmentData";
import "./style.scss";

// Dummy data for graph
// Pls delete it after API integration
const dummyAttendanceData = [
  {
    "status": "Present",
    "month": "Jan",
    "value": 12
  },
  {
    "status": "Present",
    "month": "Feb",
    "value": 13
  },
  {
    "status": "Present",
    "month": "Mar",
    "value": 14
  },
  {
    "status": "Present",
    "month": "Apr",
    "value": 1
  },
  {
    "status": "Present",
    "month": "May",
    "value": 9
  },
  {
    "status": "Present",
    "month": "Jun",
    "value": 2
  },
  {
    "status": "Present",
    "month": "Jul",
    "value": 7
  },
  {
    "status": "Present",
    "month": "Aug",
    "value": 3
  },
  {
    "status": "Present",
    "month": "Sep",
    "value": 4
  },
  {
    "status": "Present",
    "month": "Oct",
    "value": 5
  },
  {
    "status": "Present",
    "month": "Nov",
    "value": 22
  },
  {
    "status": "Present",
    "month": "Dec",
    "value": 25
  },
  {
    "status": "Absent",
    "month": "Jan",
    "value": 23
  },
  {
    "status": "Absent",
    "month": "Feb",
    "value": 10
  },
  {
    "status": "Absent",
    "month": "Mar",
    "value": 9
  },
  {
    "status": "Absent",
    "month": "Apr",
    "value": 1
  },
  {
    "status": "Absent",
    "month": "May",
    "value": 2
  },
  {
    "status": "Absent",
    "month": "Jun",
    "value": 3
  },
  {
    "status": "Absent",
    "month": "Jul",
    "value": 1
  },
  {
    "status": "Absent",
    "month": "Aug",
    "value": 0
  },
  {
    "status": "Absent",
    "month": "Sep",
    "value": 7
  },
  {
    "status": "Absent",
    "month": "Oct",
    "value": 1
  },
  {
    "status": "Absent",
    "month": "Nov",
    "value": 2
  },
  {
    "status": "Absent",
    "month": "Dec",
    "value": 5
  },
  {
    "status": "Leave",
    "month": "Jan",
    "value": 1
  },
  {
    "status": "Leave",
    "month": "Feb",
    "value": 1
  },
  {
    "status": "Leave",
    "month": "Mar",
    "value": 2
  },
  {
    "status": "Leave",
    "month": "Apr",
    "value": 0
  },
  {
    "status": "Leave",
    "month": "May",
    "value": 3
  },
  {
    "status": "Leave",
    "month": "Jun",
    "value": 3
  },
  {
    "status": "Leave",
    "month": "Jul",
    "value": 4
  },
  {
    "status": "Leave",
    "month": "Aug",
    "value": 7
  },
  {
    "status": "Leave",
    "month": "Sep",
    "value": 3
  },
  {
    "status": "Leave",
    "month": "Oct",
    "value": 2
  },
  {
    "status": "Leave",
    "month": "Nov",
    "value": 2
  },
  {
    "status": "Leave",
    "month": "Dec",
    "value": 4
  },
]
// END

const CompanyAdminAttendance = () => {
  const [state, setState] = useState({
    graphSelectedMonth: dayjs().format('MMMM'),
    cardsData: [
      { id: 1, name: "Interns", count: 211 },
      { id: 2, name: "Present", count: 111 },
      { id: 3, name: "Leave", count: 48 },
      { id: 4, name: "Absent", count: 52 }
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
      <PageHeader title="Attendance" actions bordered>
        <Link to={`${ROUTES_CONSTANTS.DETAIL}`} className="attendance-detail-btn">
          Attendance Details
        </Link>
      </PageHeader>
      <Row gutter={[20, 20]}>
        {
          state.cardsData.map((item: any) => {
            return (
              <Col xxl={6} xl={6} md={12} sm={24} xs={24} key={item.id}>
                <AttendanceCard
                  title={item.name}
                  count={item.count}
                  avatar={<div className={`cards ${item.name}`}>{cardIcon(item.name)}</div>}
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
                styling={{ height: '235px' }}
                attendanceData={dummyAttendanceData}
              />
            </Col>
            <Col xs={24}>
              <MonthlyPerfomanceChart
                data={AttendanceDepartmentData}
                heading="Attendance By department"
                color={['#4A9D77', '#E95060', '#FFC15D']}
                columnStyle={{ radius: [5, 5, 0, 0] }}
                columnWidthRatio={.5}
                children={
                  <div className="ml-auto w-40">
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
    </div>
  )
}

export default CompanyAdminAttendance;