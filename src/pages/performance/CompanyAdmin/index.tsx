import { useState, useEffect } from "react";
// import all reusable componets from component/index.ts
import { OverAllPerfomance, MonthlyPerfomanceChart, PageHeader } from "../../../components";
import { TopPerformanceList } from "../../../components/TopPerformanceList";
// end
import data from './data';
import '../style.scss';
import { Link } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";

const CompanyAdminPerformance = () => {
  const performanceData = [
    {
      percent: '85',
      strokeColor: '#4783FF',
      title: 'Overall'
    },
    {
      percent: '85',
      strokeColor: '#9BD5E8',
      title: 'Learning'
    },
    {
      percent: '75',
      strokeColor: '#F08D97',
      title: 'Discipline'
    },
    {
      percent: '68',
      strokeColor: '#78DAAC',
      title: 'Personal'
    }
  ];

  const evaluationHistoryData = [
    {
      id: 1,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 40,
    },
    {
      id: 2,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 80,
    },
    {
      id: 3,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 50,
    },
    {
      id: 4,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 30,
    },
    {
      id: 5,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 100,
    },
  ];

  return (
    <>
      <PageHeader
        actions
        title="Performance"
      >
        <Link
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`}
          className="performance-history-btn">
          View History
        </Link>
      </PageHeader>

      <div className="company-admin-performance-container gap-4">
        <div className="performance-left-subcontainer ">
          <OverAllPerfomance
            heading="Overall Performance"
            data={performanceData}
            trailColor="#E6F4F9"
            strokeWidth={10}
            type="circle"
            width={100}
          />

          <div className="my-4 h-[502px]">
            <MonthlyPerfomanceChart
              heading="Summary"
              data={data}
              XField="department"
              columnWidthRatio={0.5}
              isMonthNavigationPresent={true}
              month='Jan'
              changeMonth={() => console.log("Month Changed")}
            />
          </div>
        </div>

        <div className="performance-right-subcontainer ">
          <TopPerformanceList />
        </div>
      </div>
    </>
  )
}

export default CompanyAdminPerformance;