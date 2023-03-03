import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DualAxes } from '@ant-design/plots';

const CustomTooltip = (props: any) => {
  // if (active) {
  //   return (
  //     <div className="custom-tooltip">
  //       <p className="label">{`${label}`}</p>
  //       <p className="title">{`Data 1: ${payload[0].value}`}</p>
  //       <p className="title">{`Data 2: ${payload[1].value}`}</p>
  //     </div>
  //   );
  // }
  return null;
};

const Graph = () => {
  const data = [
    {
      month: 'Jan',
      present: 30,
      absent: 10,
    },
    {
      month: 'Feb',
      present: 20,
      absent: 3,
    },
    {
      month: 'Mar',
      present: 10,
      absent: 5,
    },
    {
      month: 'Apr',
      present: 7,
      absent: 5,
    },
    {
      month: 'May',
      present: 4,
      absent: 9,
    },
    {
      month: 'Jun',
      present: 6,
      absent: 35,
    },
    {
      month: 'Jul',
      present: 7,
      absent: 17,
    },
    {
      month: 'Aug',
      present: 100,
      absent: 0,
    },
    {
      month: 'Sep',
      present: 50,
      absent: 0,
    },
    {
      month: 'Oct',
      present: 13,
      absent: 16,
    },
    {
      month: 'Nov',
      present: 4,
      absent: 8,
    },
    {
      month: 'Dec',
      present: 10,
      absent: 20,
    },
  ];

  const config = {
    data: [data, data],
    xField: 'month',
    yField: ['present', 'absent'],

    tooltip: {
      customContent: (props: any) => <CustomTooltip />
    },

    xAxis: {
      label: {
        offset: 30,
      },
      grid: {
        visible: true,
        line: {
          style: {
            stroke: '#D9DBE9',
          },
        },
      },
    },

    yAxis: [
      {
        // min: 0,
        // max: 100,
        tickCount: 3,
        label: {
          formatter: (val: any) => `${val}%`,
        },
      },
      {
        label: null,
      },
    ],

    geometryOptions: [
      {
        geometry: 'line',
        smooth: true,
        color: '#4A9D77',
        lineStyle: {
          lineWidth: 4,
          opacity: 0.5,
        },
        // label: {
        //   formatter: (datum: any) => {
        //     return `${datum.absent}`;
        //   },
        // },
        point: {
          shape: 'circle',
          size: 10,
          style: {
            // opacity: 0.5,
            stroke: '#4A9D77',
            fill: '#4A9D77',
          },
        },
      },
      {
        geometry: 'line',
        smooth: true,
        color: '#E95060',
        lineStyle: {
          lineWidth: 4,
          opacity: 0.5,
        },
        // label: {
        //   formatter: (datum: any) => {
        //     return `${datum.absent}`;
        //   },
        // },
        point: {
          shape: 'circle',
          size: 10,
          style: {
            opacity: 0.5,
            stroke: '#E94E5D',
            fill: '#E94E5D',
          },
        },
      },
    ],
    options: {
      tooltips: {
        callbacks: {
          title: () => "Tile",
          label: () => "Body"
        }
      }
    }
  };
  return <DualAxes {...config} />;
};

export default Graph;