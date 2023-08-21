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
  Loader,
} from "../../../components";
import "../style.scss";
import { gutter } from "..";
import { useRecoilValue } from "recoil";
import { announcementDataState, currentUserRoleState, currentUserState } from "../../../store";
import useMainCustomHook from "../actionHandler";
import dayjs from "dayjs";
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
    // birthday
    usersBirthdaysList,
    getUsersBirthdaysList,
    wishBirthdayToUser,
    dashboardLeavesCount,
    getDashboardLeavesCount,
    // manager and companies university list
    getManagerCompanyUniversitiesList,
    managerCompanyUniversitiesList: universityList = [],
    // manager dashboard widgets
    getManagerWidgets,
    managerWidgets,
    // announcement
    addNewAnnouncement,
    getAnnouncementData,
    commonLoaders
  } = useMainCustomHook();

  const { isAnnouncementLoading, isPerformanceLoading, isAttendanceLoading, isWidgetsLoading, isopPerformersLoading, isAwayLoading, isUniversitiesLoading, isBirthdayLoading } = commonLoaders;

  const announcementData: any = useRecoilValue(announcementDataState);
  const role = useRecoilValue(currentUserRoleState);
  const userData = useRecoilValue(currentUserState);
  const handleAddAnnouncement = () => {
    setIsShowModal(true);
  };

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getAnnouncementData();
      getTopPerformerList();
      getAttendance();
      getPerformanceGraphAnalytics();
      getUsersBirthdaysList();
      getDashboardLeavesCount();
      getManagerCompanyUniversitiesList();
      getManagerWidgets();
    }
  }, []);

  return <>
    <PageHeader
      title={
        <div className="font-medium">
          It's good to have you back,&nbsp;
          <span className="page-header-secondary-color capitalize">
            {userData.firstName + " " + userData.lastName}!
          </span>
        </div>
      }
    />
    <Row gutter={gutter}>
      <Col xs={24} sm={24} xl={17} xxl={19}>
        <Row className="rounded-2xl bg-white wrapper-shadow">
          <Col xs={24} lg={9} xl={10} className="p-5">
            <CountingCard
              totalInterns={managerWidgets?.totalCompanyInternsCount ?? 0}
              present={managerWidgets?.totalPresent ?? 0}
              myInterns={managerWidgets?.assignedInternsCount ?? 0}
              onLeave={managerWidgets?.totalAbsent ?? 0}
              isLoading={isWidgetsLoading}
            />
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
                isLoading={isPerformanceLoading}
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} xl={7} xxl={5}>
        <TopPerformers topPerformersList={topPerformerList} loading={isopPerformersLoading} />
      </Col>
      <Col xs={24} sm={24} xl={6} xxl={7}>
        {announcementData && (
          <>
            <AnnouncementList
              data={announcementData}
              role={role}
              handleAddAnnouncement={handleAddAnnouncement}
              height={460}
              loading={isAnnouncementLoading}
            />
          </>
        )}
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
              isLoading={isAttendanceLoading}
            />
          </Col>
          <Col xs={24}>
            <Row gutter={gutter} justify="space-between">
              {isUniversitiesLoading ? <div className="h-[145px]"><Loader /></div> :
                universityList?.map(({ logo, title, internList }: any) => (
                  <Col flex={1}>
                    <UniversityCard logo={logo} title={title} maxCount={6} list={internList} />
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
              isLoading={isAwayLoading}
            />
          </Col>
          <Col xs={24} lg={12} xxl={24}>
            <BirthdayWishes wishList={usersBirthdaysList} wishBirthdayToUser={wishBirthdayToUser} isLoading={isBirthdayLoading} />
          </Col>
        </Row>
      </Col>
    </Row>
    <AnnouncementModal
      isShowModal={isShowModal}
      close={() => setIsShowModal(false)}
      addNewAnnouncement={addNewAnnouncement}
    />
  </>
};

export default Manager;
