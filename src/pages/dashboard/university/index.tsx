import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import {
  AttendanceAndListingGraph,
  CountingCard,
  MonthlyPerfomanceChart,
  TopPerformers,
  PageHeader,
} from "../../../components";
import {
  agnecyList,
  PerformanceAnalyticsData,
  topPerformers,
} from "./mockData";
import "../style.scss";
import { gutter } from "..";
import AgencyCard from "../../../components/AgencyCard";
import constants from "../../../config/constants";

const University = () => {
  const [state, setState] = useState({
    list: [],
    loading: false,
  });

  const loadMoreData = () => {
    setState((prevState) => {
      return {
        ...prevState,
        loading: !state.loading,
      };
    });

    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
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
    loadMoreData();
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
                  XField="city"
                  YField="value"
                  color={["#9BD5E8", "#F08D97", "#78DAAC"]}
                  columnStyle={{
                    radius: [20, 20, 0, 0],
                  }}
                  columnWidthRatio={0.2}
                  data={PerformanceAnalyticsData}
                  fontSize="20px"
                  fontWeight="500"
                  heading="Performance Analytics"
                  isGroup
                  marginRatio=".5"
                  seriesField="type"
                  textColor="#4E4B66"
                  style={{ height: 260 }}
                />
              </div>
            </Col>
            <Col xs={24} xl={12} xxl={24}>
              <AttendanceAndListingGraph
                title="Listing"
                level={4}
                graphName="attendance"
                styling={{ height: 255 }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} lg={24} xl={12} xxl={7}>
          <AgencyCard agnecyList={agnecyList} />
        </Col>
        <Col xs={24} sm={24} xl={12} xxl={5}>
          <TopPerformers topPerformersList={topPerformers} user={constants?.UNIVERSITY} />
        </Col>
      </Row>
    </>
  );  
};

export default University;
