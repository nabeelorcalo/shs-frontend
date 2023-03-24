import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import growthAnalyticsData from './data';
import '../style.scss';

export const GrowthAnalyticsGraph = ({ graphName }: any) => {
  const data = growthAnalyticsData;
  
  const attributeColors: any = {
    "Interns": "#363565",
    "Universities": "#E94E5D",
    "Companies": "#9BD5E8",
    "Agents": "#252D9B",
  }

  useEffect(() => {

  }, []);

  const config: any = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'name',
    color: ['#363565', '#E94E5D', '#9BD5E8', '#252D9B'],

    xAxis: {
      label: {
        offset: 30,
        formatter: (v: any) => {
          let date = v.split(" ");
          return `${date[0]}`;
        },
      },
    },

    yAxis: {
      // label: {
      //   formatter: (v: any) => `${(v / 10e8).toFixed(1)} B`,
      // },
    },

    meta: {
      date: {
        nice: true,
        range: [0, 1],
      },
    },

    legend: {
      position: 'bottom-left',
      offsetY: 18,
      marker: function (name: any) {
        return { symbol: 'circle', style: { fill: attributeColors[name]} }
      },
    },

    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
  };

  return <Line {...config} />;
};