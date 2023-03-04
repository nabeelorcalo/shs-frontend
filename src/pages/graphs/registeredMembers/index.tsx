import React, { useState, useEffect } from 'react';
import { DualAxes } from '@ant-design/plots';
import data from './data';

const Graph = (props: any) => {
  // const parent: any = document.getElementsByClassName('registered-members');
  // const legendPosition: any = parent.innerWidth - 808; // <== uncommnt it

  const legendPosition: any = window.innerWidth - 750; // <== Remove it
  console.log("legendPosition: ", legendPosition);
  
  const config = {
    data: [data, data],
    xField: 'month',
    yField: ['Active', 'Inactive'],

    legend: {
      position: 'top',
      align: 'right',
      offsetX: legendPosition,
      marker: { symbol: 'square', radius: 8 }
      // verticalAlign: 'right',
      // layout: 'horizontal',
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
        min: 0,
        max: 100,
        tickCount: 3,
        label: {
          formatter: (val: any) => `${val}%`,
        },
      },
      {
        min: 0,
        max: 100,
        tickCount: 3,
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
        //     return `${datum.Active}`;
        //   },
        // },
        point: {
          shape: 'circle',
          size: 10,
          style: {
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
        //     return `${datum.Inactive}`;
        //   },
        // },
        point: {
          shape: 'circle',
          size: 10,
          style: {
            stroke: '#E94E5D',
            fill: '#E94E5D',
          },
        },
      },
    ],

    tooltip: {
      formatter: (props: any) => {
        let attributeName = props.hasOwnProperty('Active') ? "Active" : "Inactive";
        let value = attributeName === 'Active' ? props.Active : props.Inactive;

        return { name: attributeName, value: `${value}%` }
      },
    },

  };

  return (
    <DualAxes {...config} />
  );
};

export default Graph;