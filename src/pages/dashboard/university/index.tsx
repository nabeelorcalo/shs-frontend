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
  } = useMainCustomHook();

  const loadMoreData = () => {
    setState((prevState) => {
      return {
        ...prevState,
        loading: !state.loading,
      };
    });

    fetch("https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo")
      .then((res) => res.json())
      .then((body) => {
        setState((prevState) => {
          return {
            ...prevState,
            list: body.results,
            loading: !state.loading,
          };
        });
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      loadMoreData();
      getTopPerformerList({ limit: 0 });
      getAllCompaniesData();
      getPerformanceGraphAnalytics();
      getAttendance();
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
            registeredStudents={33}
            hiredStudents={6}
            completedInternship={9}
            ongoingInternship={3}
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
        <Col xs={24} sm={24} lg={24} xl={12} xxl={7}>
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
