import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import {
  OverAllPerfomance,
  MonthlyPerfomanceChart,
  PageHeader,
  TopPerformanceList,
  MonthChanger,
  BoxWrapper
} from "../../../components";
import data from "./data";
import dayjs from "dayjs";
import { Row, Col } from "antd";
import "../style.scss";

const CompanyAdminPerformance = () => {
  const [state, setState] = useState({
    topPerformanceList: [
      {
        id: 0,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 1,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 2,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 3,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 4,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 5,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 6,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 7,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 8,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
    ],
  });

  const performanceData = [
    {
      percent: "85",
      strokeColor: "#4783FF",
      title: "Overall",
    },
    {
      percent: "85",
      strokeColor: "#9BD5E8",
      title: "Learning",
    },
    {
      percent: "75",
      strokeColor: "#F08D97",
      title: "Discipline",
    },
    {
      percent: "68",
      strokeColor: "#78DAAC",
      title: "Personal",
    },
  ];

  const [month, setMonth] = useState({
    currentMonthIndex: dayjs().month(),
    selectedMonth: dayjs().format("MMM"),
    data: data,
  });

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
                data={performanceData}
                trailColor="#E6F4F9"
                strokeWidth={10}
                type="circle"
                width={100}
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
                  />}
                />
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={24} xl={7}>
          <TopPerformanceList heading="Top Performers" data={state.topPerformanceList} action={true} />
        </Col>
      </Row>
    </>
  );
};

export default CompanyAdminPerformance;
