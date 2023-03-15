import { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import { OverAllPerfomance } from "../../../components";

const InternPerformance = () => {
  const data = [
    {
      percent1: '85',
      strokeColor: '#4783FF',
      title: 'Overall'
    },
    {
      percent1: '85',
      strokeColor: '#9BD5E8',
      title: 'Learning'
    },
    {
      percent1: '75',
      strokeColor: '#F08D97',
      title: 'Discipline'
    },
    {
      percent1: '68',
      strokeColor: '#78DAAC',
      title: 'Personal'
    }
  ];

  return (
    <>
      <PageHeader title="Performance" />

      <div className="performance-container">
        <div className="performance-left-subcontainer">
          <OverAllPerfomance
            data={data}
            heading="Overall Performance"
            strokeWidth={10}
            trailColor="#E6F4F9"
            type="circle"
            width={100}
          />
        </div>

        <div className="performance-right-subcontainer">

        </div>
      </div>
    </>
  )
}

export default InternPerformance;