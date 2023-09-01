import { useEffect, useRef } from "react";
import { Row, Col } from "antd";
import {
  AttendanceAndListingGraph,
  CountingCard,
  MonthlyPerfomanceChart,
  TopPerformers,
  PageHeader,
} from "../../../components";
import "../style.scss";
import { gutter } from "..";
import AgencyCard from "../../../components/AgencyCard";
import constants from "../../../config/constants";
import useMainCustomHook from "../actionHandler";
import useCustomHook from "./actionHandler";

const University = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const {
    currentUser,
    topPerformerList,
    getTopPerformerList,
    getPerformanceGraphAnalytics,
    performanceGraphAnalytics,

    commonLoaders
  } = useMainCustomHook();

  const {
    universityLoaders,
    getAllCompaniesData,
    universityCompanies,
    // university dashboard
    getUniversityDashboardWidget,
    universityWidgets,
    getUniversityAttendanceGraph,
    universityAttendanceGraph,
  } = useCustomHook()

  const { isPerformanceLoading, isopPerformersLoading } = commonLoaders;
  const { isWidgetsLoading, isUniversityCompaniesLoading, isAttendanceLoading } = universityLoaders
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getTopPerformerList({ limit: 0 });
      getAllCompaniesData();
      getPerformanceGraphAnalytics();
      getUniversityAttendanceGraph();
      getUniversityDashboardWidget();
    }
  }, []);

  return <>
    <PageHeader
      title={
        <div className="font-medium">
          It's good to have you back,&nbsp;
          <span className="page-header-secondary-color capitalize">{`${currentUser?.firstName} ${currentUser?.lastName}`}</span>
        </div>
      }
    />
    <Row gutter={gutter}>
      <Col xs={24}>
        <CountingCard
          registeredStudents={universityWidgets?.regStudent ?? 0}
          hiredStudents={universityWidgets?.hiredIntern ?? 0}
          completedInternship={universityWidgets?.compeletedIntern ?? 0}
          ongoingInternship={universityWidgets?.ongoingIntern ?? 0}
          isLoading={isWidgetsLoading}
          isSeprate
        />
      </Col>
      <Col xs={24} sm={24} xxl={12}>
        <Row gutter={gutter} className="">
          <Col xs={24} xl={12} xxl={24}>
            <div className="rounded-2xl bg-white wrapper-shadow p-5">
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
                style={{ height: 235 }}
                isLoading={isPerformanceLoading}
              />
            </div>
          </Col>
          <Col xs={24} xl={12} xxl={24}>
            <AttendanceAndListingGraph
              title="Attendance"
              level={4}
              graphName="attendance"
              attendanceData={universityAttendanceGraph}
              styling={{ height: 220 }}
              isLoading={isAttendanceLoading}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} lg={24} xl={12} xxl={7} className="flex">
        <AgencyCard agnecyList={universityCompanies} isloading={isUniversityCompaniesLoading} />
      </Col>
      <Col xs={24} sm={24} xl={12} xxl={5}>
        <TopPerformers topPerformersList={topPerformerList} user={constants?.UNIVERSITY} loading={isopPerformersLoading} />
      </Col>
    </Row>
  </>
};

export default University;
