import { useEffect, useRef, useState } from "react";
import { Row, Col } from "antd";
import {
  AnnouncementList,
  AnnouncementModal,
  AttendanceAndListingGraph,
  BirthdayWishes,
  CountingCard,
  LeaveDetails,
  MonthlyPerfomanceChart,
  TopPerformers,
  UniversityCard,
  PageHeader,
} from "../../../components";
import constants from "../../../config/constants";
import { PerformanceAnalyticsData, topPerformers, universityList } from "./mockData";
import "../style.scss";
import { gutter } from "..";
import { useRecoilValue } from "recoil";
import { announcementDataState, currentUserRoleState, currentUserState } from "../../../store";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";

let isCancelled = false;

const Manager = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const {
    topPerformerList,
    getTopPerformerList,
    getAttendance,
    attendance,
    performanceGraphAnalytics,
    getPerformanceGraphAnalytics,
    usersBirthdaysList,
    getUsersBirthdaysList,
    dashboardLeavesCount,
    getDashboardLeavesCount,
  } = useCustomHook();
  const announcementData: any = useRecoilValue(announcementDataState);

  const role = useRecoilValue(currentUserRoleState);
  const userData = useRecoilValue(currentUserState);

  const handleAddAnnouncement = () => {
    setIsShowModal(true);
  };
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getTopPerformerList();
      getAttendance();
      getPerformanceGraphAnalytics();
      getUsersBirthdaysList();
      getDashboardLeavesCount();
    }
  }, []);
  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color"> {userData.firstName + " " + userData.lastName}</span>
          </div>
        }
      />
      <Row gutter={gutter}>
        <Col xs={24} sm={24} xl={17} xxl={19}>
          <Row className="rounded-2xl bg-white wrapper-shadow">
            <Col xs={24} lg={9} xl={10} className="p-5">
              <CountingCard totalInterns={33} present={6} myInterns={9} onLeave={3} />
            </Col>
            <Col xs={24} lg={15} xl={14}>
              <div className="p-5">
                <MonthlyPerfomanceChart
                  XField="month"
                  YField="value"
                  color={["#9BD5E8", "#F08D97", "#78DAAC"]}
                  columnStyle={{
                    radius: [20, 20, 0, 0],
                  }}
                  columnWidthRatio={0.2}
                  data={performanceGraphAnalytics}
                  fontSize="20px"
                  fontWeight="500"
                  heading="Performance Analytics"
                  isGroup
                  marginRatio=".5"
                  seriesField="type"
                  textColor="#4E4B66"
                  style={{ height: 300 }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} xl={7} xxl={5}>
          <TopPerformers topPerformersList={topPerformerList} />
        </Col>
        <Col xs={24} sm={24} xl={6} xxl={7}>
          <AnnouncementList
            data={announcementData}
            role={role}
            handleAddAnnouncement={handleAddAnnouncement}
            height={460}
          />
        </Col>

        <Col xs={24} sm={24} lg={24} xl={18} xxl={12}>
          <Row gutter={gutter}>
            <Col xs={24}>
              <AttendanceAndListingGraph
                title="Attendance"
                level={4}
                graphName="attendance"
                styling={{ height: 228 }}
                attendanceData={attendance}
              />
            </Col>
            <Col xs={24}>
              <Row gutter={gutter} justify="space-between">
                {universityList?.map(({ logo, title, peopleList }) => (
                  <Col flex={1}>
                    <UniversityCard logo={logo} title={title} maxCount={6} list={peopleList} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={24} xxl={5}>
          <Row gutter={gutter}>
            <Col xs={24} lg={12} xxl={24}>
              <LeaveDetails
                title={"Who’s Away"}
                sickLeaves={dashboardLeavesCount?.sick ?? []}
                casualLeaves={dashboardLeavesCount?.casual ?? []}
                medicalLeaves={dashboardLeavesCount?.medical ?? []}
                workFromHome={dashboardLeavesCount?.wfh ?? []}
                date={dayjs(new Date()).format("DD MMM,YYYY")}
              />
            </Col>
            <Col xs={24} lg={12} xxl={24}>
              <BirthdayWishes wishList={usersBirthdaysList} />
            </Col>
          </Row>
        </Col>
      </Row>
      <AnnouncementModal isShowModal={isShowModal} close={() => setIsShowModal(false)} />
    </>
  );
};

export default Manager;
