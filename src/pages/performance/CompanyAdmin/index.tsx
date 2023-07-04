import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { useRecoilValue } from "recoil";
import usePerformanceHook from "../actionHandler";
import { allPerformanceState } from "../../../store";
import useMainCustomHook from "../../dashboard/actionHandler";
import {
  OverAllPerfomance,
  MonthlyPerfomanceChart,
  PageHeader,
  MonthChanger,
  BoxWrapper,
  TopPerformers
} from "../../../components";
import data from "./data";
import dayjs from "dayjs";
import { Row, Col } from "antd";
import "../style.scss";

const CompanyAdminPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {getTopPerformerList, topPerformerList, isLoading} = useMainCustomHook();
  const { getAllPerformance, allPerformance, getPerformanceSummary, performanceSummary } = usePerformanceHook();
  const [loadingSummary, setLoadingSummary] = useState(false)
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
    getPerformanceSummary(setLoadingSummary, {})
  }, [])


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
    
    if(allPerformance != null) {
      for(let i = 0; i < allPerformance?.length; i++  ) {
        overall += Math.round(allPerformance[i]['sumOverallRating'] / allPerformance.length)
        learning += Math.round(allPerformance[i]['learningObjectiveRating'] / allPerformance.length)
        discipline += Math.round(allPerformance[i]['disciplineRating'] / allPerformance.length)
        personal += Math.round(allPerformance[i]['personalRating'] / allPerformance.length)
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
    ]
  }

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
      <Row gutter={[25, 25]} className="company-admin-performance-container">
        <Col xs={24} md={24} xl={17}>
          <Row gutter={[25, 25]}>
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
              <BoxWrapper className="attendance-department">
                <MonthlyPerfomanceChart
                  heading="Summary"
                  data={data}
                  XField="department"
                  columnWidthRatio={0.5}
                  height='400px'
                  children={<MonthChanger
                    month={month.selectedMonth}
                    onClick={changeMonth}
                    picker="week"
                  />}
                />
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={24} xl={7}>
          <div className="topPerformers-cont">
            <TopPerformers topPerformersList={topPerformerList} loading={isLoading} />
          </div>
          
          {/* <TopPerformanceList
            heading="Top Performers"
            data={topPerformers}
            loading={loadingTopPerformers}
            action={true} 
          /> */}
        </Col>
      </Row>
    </>
  );
};

export default CompanyAdminPerformance;
