import { Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { announcementDataState, currentUserRoleState, currentUserState } from "../../../store";
import { gutter } from "..";
import {
  AnnouncementList,
  BirthdayWishes,
  InternshipSummaryChart,
  LeaveDetails,
  MonthlyPerfomanceChart,
  AnnouncementModal,
  CountingCard,
  TopPerformers,
  UniversityCard,
  AttendanceAndListingGraph,
  PageHeader,
  BoxWrapper,
} from "../../../components";
import "../style.scss";
import { PerformanceAnalyticsData, topPerformers, universityList } from "./mockData";
import PiplineTable from "./PiplineTable";
import Constants from "../../../config/constants";
import useMainCustomHook from "../actionHandler";
import useCustomHook from "./actionHandler";
import dayjs from "dayjs";

const CompanyAdmin = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { getData, debouncedResults } = useCustomHook();
  const {
    getAttendance,
    attendance,
    topPerformerList,
    getTopPerformerList,
    getUsersBirthdaysList,
    usersBirthdaysList,
    getPerformanceGraphAnalytics,
    performanceGraphAnalytics,
    // dashboard leaves count
    dashboardLeavesCount,
    getDashboardLeavesCount,
    // manager and companies university list
    getManagerCompanyUniversitiesList,
    managerCompanyUniversitiesList: universityList = [],
    // internships
    getInternShipList,
    internshipsList,
    internshipsSummeryGraph,
  } = useMainCustomHook();
  const announcementData = useRecoilValue(announcementDataState);
  const role = useRecoilValue(currentUserRoleState);
  const userData = useRecoilValue(currentUserState);

  // console.log("internshipsList", internshipsList);

  const handleAddAnnouncement = () => {
    setIsShowModal(true);
  };
  const handleSelect = (value: string) => {};
  useEffect(() => {
    if (shouldLoogged.current) {
      getAttendance();
      getData();
      getTopPerformerList();
      getUsersBirthdaysList();
      getPerformanceGraphAnalytics();
      getDashboardLeavesCount();
      getManagerCompanyUniversitiesList();
      getInternShipList();
      shouldLoogged.current = false;
    }
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  // console.log(dashboardLeavesCount, "dashboardLeavesCount");

  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color">{userData.firstName + " " + userData.lastName}</span>
          </div>
        }
      />
      <Row gutter={gutter}>
        <Col xs={24} xl={15} xxl={17}>
          <PiplineTable internshipsList={internshipsList} handleSelect={handleSelect} />
        </Col>
        <Col xs={24} xl={9} xxl={7}>
          <InternshipSummaryChart
            autoFit
            barStyle={{
              lineCap: "round",
            }}
            colorField="name"
            heading="Internships Summary"
            innerRadius={0.5}
            intervalPadding={9.1}
            maxAngle={360}
            padding="auto"
            radius={0.8}
            xAxis={{
              label: null,
            }}
            xField="name"
            yField="star"
            height={300}
            internshipsSummeryGraph={internshipsSummeryGraph}
          />
        </Col>
        <Col xs={24}>
          <CountingCard
            totalApplicants={33}
            totalUniversitiesComapany={6}
            totalInternsComapany={9}
            totalManagers={3}
            isSeprate={true}
          />
        </Col>
        <Col xs={24} xl={8} xxl={6}>
          {announcementData && (
            <>
              <AnnouncementList
                data={announcementData}
                role={role}
                handleAddAnnouncement={handleAddAnnouncement}
                height={460}
              />
            </>
          )}
        </Col>
        <Col xs={24} md={24} xl={16} xxl={13}>
          <Row gutter={gutter} className="flex-col">
            <Col>
              <BoxWrapper>
                <MonthlyPerfomanceChart
                  XField="month"
                  YField="value"
                  color={["#9BD5E8", "#F08D97", "#78DAAC"]}
                  columnStyle={{
                    radius: [20, 20, 0, 0],
                  }}
                  columnWidthRatio={0.4}
                  data={performanceGraphAnalytics}
                  fontSize="20px"
                  fontWeight="500"
                  heading="Performance Analytics"
                  isGroup
                  marginRatio=".5"
                  seriesField="type"
                  textColor="#4E4B66"
                  style={{ height: 235 }}
                />
              </BoxWrapper>
            </Col>

            <Col xs={24}>
              <AttendanceAndListingGraph
                title="Attendance"
                level={4}
                graphName="attendance"
                styling={{ height: 230 }}
                attendanceData={attendance}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} xl={24} xxl={5}>
          <Row gutter={gutter}>
            <Col xs={24} xl={12} xxl={24}>
              <TopPerformers topPerformersList={topPerformerList} user={Constants?.COMPANY_ADMIN} />
            </Col>
            <Col xs={24} xl={12} xxl={24}>
              <LeaveDetails
                title={"Who’s Away"}
                sickLeaves={dashboardLeavesCount?.sick ?? []}
                casualLeaves={dashboardLeavesCount?.casual ?? []}
                medicalLeaves={dashboardLeavesCount?.medical ?? []}
                workFromHome={dashboardLeavesCount?.wfh ?? []}
                date={dayjs(new Date()).format("DD MMM,YYYY")}
                user={Constants?.COMPANY_ADMIN}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Row gutter={gutter} align="middle">
            <Col xs={24} lg={24} xl={24} xxl={19}>
              <Row gutter={gutter} justify="space-between">
                {universityList?.map(({ logo, title, internList }: any) => (
                  <Col flex={1}>
                    <UniversityCard logo={logo} title={title} maxCount={6} list={internList} />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={24} lg={24} xxl={5}>
              <BirthdayWishes wishList={usersBirthdaysList} />
            </Col>
          </Row>
        </Col>
      </Row>
      <AnnouncementModal isShowModal={isShowModal} close={() => setIsShowModal(false)} />
    </>
  );
};

export default CompanyAdmin;
