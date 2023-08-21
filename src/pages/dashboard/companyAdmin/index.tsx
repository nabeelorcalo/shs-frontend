import { Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  announcementDataState,
  currentUserRoleState,
  currentUserState,
} from "../../../store";
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
  NoDataFound,
  Loader,
} from "../../../components";
import "../style.scss";
import PiplineTable from "./PiplineTable";
import Constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import useMainCustomHook from "../actionHandler";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import constants from "../../../config/constants";

const CompanyAdmin = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const {
    isLoading,
    getAttendance,
    attendance,
    topPerformerList,
    getTopPerformerList,
    // birthday
    usersBirthdaysList,
    getUsersBirthdaysList,
    wishBirthdayToUser,
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
    // department list for pipline table filter
    getDepartmentList,
    departmentList,
    getCompanyWidgets,
    companyWidgets,
    // announcement
    addNewAnnouncement,
    getAnnouncementData,
    companyAdminLoaders,
    getInternShipSummeryGraph,
    commonLoaders
  } = useMainCustomHook();
  const { isPiplineLoading, isSummeryLoading } = companyAdminLoaders;
  const { isAnnouncementLoading, isPerformanceLoading, isWidgetsLoading, isAttendanceLoading, isopPerformersLoading, isAwayLoading, isUniversitiesLoading, isBirthdayLoading } = commonLoaders;
  const announcementData = useRecoilValue(announcementDataState);
  const role = useRecoilValue(currentUserRoleState);
  const userData = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  const handleAddAnnouncement = () => {
    setIsShowModal(true);
  };
  const handleSelect = (value: string) => {
    getInternShipList(value === "all" ? "" : value);
  };
  useEffect(() => {
    if (
      userData.role == constants.COMPANY_ADMIN &&
      Object.keys(userData.company).length === 0
    ) {
      return navigate(`/${ROUTES_CONSTANTS.COMPANY_VERIFICATION_STEPS}`);
    }
    if (shouldLoogged.current) {
      getAttendance();
      getAnnouncementData();
      getTopPerformerList();
      getUsersBirthdaysList();
      getPerformanceGraphAnalytics();
      getDashboardLeavesCount();
      getManagerCompanyUniversitiesList();
      getInternShipList();
      getDepartmentList();
      getCompanyWidgets();
      getInternShipSummeryGraph()
      shouldLoogged.current = false;
    }
  }, []);

  return <>
    <PageHeader
      title={
        <div className="font-medium">
          It's good to have you back,&nbsp;
          <span className="page-header-secondary-color capitalize">
            {userData.firstName + " " + userData.lastName}
          </span>
        </div>
      }
    />
    <Row gutter={gutter}>
      <Col xs={24} xl={15} xxl={17}>
        <PiplineTable
          internshipsList={internshipsList}
          handleSelect={handleSelect}
          departmentList={departmentList}
          loading={isPiplineLoading}
        />
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
          loading={isSummeryLoading}
        />
      </Col>
      <Col xs={24}>
        <CountingCard
          totalApplicants={companyWidgets?.totalApplicantCount ?? 0}
          totalUniversitiesComapany={companyWidgets?.totalUniversity ?? 0}
          totalInternsComapany={companyWidgets?.totalInterns ?? 0}
          totalManagers={companyWidgets?.totalManagersCount ?? 0}
          isSeprate={true}
          isLoading={isWidgetsLoading}
        />
      </Col>
      <Col xs={24} xl={8} xxl={6}>
        <AnnouncementList
          data={announcementData}
          role={role}
          handleAddAnnouncement={handleAddAnnouncement}
          height={460}
          loading={isAnnouncementLoading}
        />
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
                isLoading={isPerformanceLoading}
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
              isLoading={isAttendanceLoading}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} xl={24} xxl={5}>
        <Row gutter={gutter}>
          <Col xs={24} xl={12} xxl={24}>
            <TopPerformers
              topPerformersList={topPerformerList}
              user={Constants?.COMPANY_ADMIN}
              loading={isopPerformersLoading}
            />
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
              isLoading={isAwayLoading}
            />
          </Col>
        </Row>
      </Col>

      <Col xs={24}>
        <Row gutter={gutter} align="middle">
          <Col xs={24} lg={24} xl={24} xxl={19}>
            <Row gutter={gutter} justify="space-between">
              {isUniversitiesLoading ? <div className="h-[145px]"><Loader /></div> : universityList?.length > 0 ? (
                universityList
                  ?.slice(0, 3)
                  ?.map(({ logo, title, internList }: any) => (
                    <Col flex={1}>
                      <UniversityCard
                        logo={logo}
                        title={title}
                        maxCount={6}
                        list={internList}
                      />
                    </Col>
                  ))
              ) : (
                <NoDataFound style={{ height: "100%", minHeight: "150px" }} />
              )}
            </Row>
          </Col>
          <Col xs={24} lg={24} xxl={5}>
            <BirthdayWishes
              wishList={usersBirthdaysList}
              wishBirthdayToUser={wishBirthdayToUser}
              isLoading={isBirthdayLoading}
            />
          </Col>
        </Row>
      </Col>
    </Row>
    {isShowModal && (
      <AnnouncementModal
        isShowModal={isShowModal}
        close={() => setIsShowModal(false)}
        addNewAnnouncement={addNewAnnouncement}
      />
    )}
  </>
};

export default CompanyAdmin;
