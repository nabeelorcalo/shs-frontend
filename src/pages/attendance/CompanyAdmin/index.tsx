import {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "antd/es/grid";
import dayjs from "dayjs";
import useCustomHook from "../actionHandler";

import useDashCustomHook from "../../dashboard/actionHandler";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { PageHeader, AttendanceCard, AttendanceAndListingGraph, DropDown, MonthlyPerfomanceChart, TopPerformanceList, ButtonThemeSecondary } from "../../../components";
import { Absent, AbsentIntern, PeopleIcon, PresentInterns } from "../../../assets/images";
import "./style.scss";
import { useRecoilValue } from "recoil";
import { depAttendanceList, internsAttendanceStat, todayAttendanceList } from "../../../store";

const CompanyAdminAttendance = () => {
  const action = useCustomHook();
  const navigate = useNavigate();
  const {attendance, getAttendance} = useDashCustomHook();
  const internAttStat: any = useRecoilValue(internsAttendanceStat);
  const todayAttList: any = useRecoilValue(todayAttendanceList);
  const depAttList: any = useRecoilValue(depAttendanceList);
  

  const [state, setState] = useState({
    graphSelectedMonth: dayjs().format('MMMM'),
    attendanceList: todayAttList
  });

  const cardsData = [
    { id:1,name: "Interns", count: internAttStat.totalInterns },
    { id:2,name: "Present", count: internAttStat.totalPresent },
    { id:3,name: "Leave", count: internAttStat.totalonLeave },
    { id:4,name: "Absent", count: internAttStat.totalAbsent }
  ]

  const getInternStat = async () => {
    await action.getInternAttStat();
    await action.getTodayAttList();
    await getAttendance();
  }
  const getDepAtt = async (month:string) => {
    await action.getDepAttendance(month);
  }


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
    'November',
    'December'
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

  useEffect(() => {
    getInternStat();
    getDepAtt(state.graphSelectedMonth);
  }, []);

  useEffect(() => {
    getDepAtt(state.graphSelectedMonth)
  }, [state.graphSelectedMonth]);

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
        <ButtonThemeSecondary
          className="attendance-detail-btn"
          onClick={()=> navigate(`/${ROUTES_CONSTANTS.ATTENDANCE}/${ROUTES_CONSTANTS.DETAIL}`)}
        >
          Attendance Details
        </ButtonThemeSecondary>
      </PageHeader>
      <Row gutter={[20, 20]}>
        {
          cardsData.length !== 0 && cardsData.map((item: any) => {
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
                attendanceData={attendance}
              />
            </Col>
            <Col xs={24}>
              <MonthlyPerfomanceChart
                data={depAttList}
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
            data={todayAttList}
            attendance = {true}
          />
        </Col>
      </Row>
    </div>
  )
}

export default CompanyAdminAttendance;
