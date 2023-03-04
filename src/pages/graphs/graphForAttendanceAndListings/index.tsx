import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { attendanceData, listingsData } from './data';

const Attendance = ({ graphName }: any) => {
  const data = graphName === "attendance" ? attendanceData : listingsData;
  const maxValue = graphName === "attendance" ? 30 : 100;
  const yTicks = graphName === "attendance" ? 4 : 3;
  const colors: any = graphName === "attendance" ?
    ["#4A9D77", "#E94E5D", "#FFC15D"]
    :
    ["#E94E5D", "#4A9D77", "#FFC15D"];

  const attributeColors: any = graphName === "attendance" ?
    {
      "Present": "#4A9D77",
      "Absent": "#E94E5D",
      "Leave": "#FFC15D"
    } :
    {
      "Occupied": "#4A9D77",
      "Total Listings": "#E94E5D",
      "Vacant": "#FFC15D"
    };

  // const parent: any = document.getElementsByClassName('registered-members');
  // const legendPosition: any = parent.innerWidth - 808; // <== uncommnt it

  const legendPosition: any = window.innerWidth - 850; // <== Remove it
  console.log("legendPosition: ", legendPosition, "yTicks: ", yTicks);

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'status',
    smooth: true,
    color: colors,

    xAxis: {
      tickLine: null,
      label: {
        offset: 30,
      },
      line: {
        style: {
          stroke: 'grey',
        },
      },
    },

    yAxis: {
      min: 0,
      max: maxValue,
      tickCount: yTicks,
      label: {
        formatter: (val: any) => `${val}%`,
      },
      grid: {
        visible: true,
        line: {
          style: {
            lineDash: [14, 10],
            stroke: '#D9DBE9',
          },
        },
      },
    },

    legend: {
      position: 'top',
      align: 'right',
      offsetX: legendPosition,
      marker: function (name: any) {
        return { symbol: 'square', style: { fill: attributeColors[name], radius: 8 } }
      },
    },

    lineStyle: {
      lineWidth: 4,
      cursor: 'pointer',
    },

    point: {
      size: 7,
      style: {
        lineWidth: 1,
        fillOpacity: 1,
      },
      shape: () => {
        return 'circle';
      },
    },

    tooltip: {
      formatter: (props: any) => {
        let attributeName = props.status;
        let value = `${props.value}%`;

        return { name: attributeName, value: `${value}` }
      },
    },
  };

  if(graphName === "attendance"){
    delete config.yAxis.label;
    delete config.tooltip;
  }

  return <Line {...config
  } />;
};

export default Attendance;