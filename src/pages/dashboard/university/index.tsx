import { useEffect, useRef, useState } from "react";
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

const University = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [state, setState] = useState({
    list: [],
    loading: false,
  });

  const {
    topPerformerList,
    getTopPerformerList,
    getAllCompaniesData,
    universityCompanies,
    getAttendance,
    attendance,
    getPerformanceGraphAnalytics,
    performanceGraphAnalytics,
    // university dashboard
    getUniversityDashboardWidget,
    universityWidgets,
  } = useMainCustomHook();

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getTopPerformerList({ limit: 0 });
      getAllCompaniesData();
      getPerformanceGraphAnalytics();
      getAttendance();
      getUniversityDashboardWidget();
    }
  }, []);

  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color">Maria Sanoid</span>
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
                />
              </div>
            </Col>
            <Col xs={24} xl={12} xxl={24}>
              <AttendanceAndListingGraph
                title="Attendance"
                level={4}
                graphName="attendance"
                attendanceData={attendance}
                styling={{ height: 220 }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} lg={24} xl={12} xxl={7} className="flex">
          <AgencyCard agnecyList={universityCompanies} />
        </Col>
        <Col xs={24} sm={24} xl={12} xxl={5}>
          <TopPerformers topPerformersList={topPerformerList} user={constants?.UNIVERSITY} />
        </Col>
      </Row>
    </>
  );
};

export default University;
