import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import usePerformanceHook from "../actionHandler";
import useMainCustomHook from "../../dashboard/actionHandler";
import { LoadingOutlined } from "@ant-design/icons";
import {
  OverAllPerfomance,
  MonthlyPerfomanceChart,
  PageHeader,
  TopPerformanceList,
  MonthChanger,
  BoxWrapper,
  TopPerformers,
} from "../../../components";
import data from "../CompanyAdmin/data";
import "../style.scss";
import { Col, Row, Spin } from "antd";
import dayjs from "dayjs";

const UniversityPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { getTopPerformerList, topPerformerList, isLoading } =
    useMainCustomHook();
  const {
    getAllPerformance,
    allPerformance,
    getPerformanceSummary,
    performanceSummary,
  } = usePerformanceHook();
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingAllPerformance, setLoadingAllPerformance] = useState(false);
  const [month, setMonth] = useState({
    currentMonthIndex: dayjs().month(),
    selectedMonth: dayjs().format("MMM"),
    data: data,
  });

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getTopPerformerList();
    getAllPerformance(setLoadingAllPerformance, {});
    getPerformanceSummary(setLoadingSummary);
  }, []);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const changeMonth = (event: any) => {
    let btn = event.currentTarget.name;
    let monthIndex = month.currentMonthIndex;

    if (btn === "next" && monthIndex < 11) monthIndex++;
    else if (btn === "prev" && monthIndex > 0) monthIndex--;

    setMonth((prevState) => ({
      ...prevState,
      currentMonthIndex: monthIndex,
      selectedMonth: dayjs().month(monthIndex).format("MMM"),
    }));
  };

  const overAllPerformanceData = () => {
    let overall = 0;
    let learning = 0;
    let discipline = 0;
    let personal = 0;

    if (allPerformance != null) {
      for (let i = 0; i < allPerformance?.length; i++) {
        overall += Math.round(
          allPerformance[i]["sumOverallRating"] / allPerformance.length
        );
        learning += Math.round(
          allPerformance[i]["learningObjectiveRating"] / allPerformance.length
        );
        discipline += Math.round(
          allPerformance[i]["disciplineRating"] / allPerformance.length
        );
        personal += Math.round(
          allPerformance[i]["personalRating"] / allPerformance.length
        );
      }
    }
    return [
      {
        percent: overall,
        strokeColor: "#4783FF",
        title: "Overall",
      },
      {
        percent: learning,
        strokeColor: "#9BD5E8",
        title: "Learning",
      },
      {
        percent: discipline,
        strokeColor: "#F08D97",
        title: "Discipline",
      },
      {
        percent: personal,
        strokeColor: "#78DAAC",
        title: "Personal",
      },
    ];
  };

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <PageHeader actions title="Performance">
        <Link
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`}
          className="performance-history-btn font-semibold"
        >
          View History
        </Link>
      </PageHeader>
      <Row gutter={[20, 20]} className="company-admin-performance-container">
        <Col xs={24} md={24} xl={17}>
          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <OverAllPerfomance
                heading="Overall Performance"
                data={overAllPerformanceData()}
                trailColor="#E6F4F9"
                strokeWidth={10}
                type="circle"
                width={100}
                loading={loadingAllPerformance}
              />
            </Col>
            <Col xs={24}>
              <BoxWrapper>
                <Spin spinning={loadingSummary} indicator={<LoadingOutlined />}>
                  <MonthlyPerfomanceChart
                    heading="Summary"
                    XField="month"
                    YField="value"
                    color={["#9BD5E8", "#F08D97", "#78DAAC"]}
                    columnStyle={{ radius: [20, 20, 0, 0] }}
                    columnWidthRatio={0.4}
                    data={performanceSummary}
                    fontSize="20px"
                    fontWeight="500"
                    isGroup
                    marginRatio=".5"
                    seriesField="type"
                    textColor="#4E4B66"
                    height="400px"
                  />
                </Spin>
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={24} xl={7}>
          <div className="topPerformers-cont">
            <TopPerformers
              topPerformersList={topPerformerList}
              loading={isLoading}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UniversityPerformance;
