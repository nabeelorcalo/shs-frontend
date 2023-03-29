import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { attendanceData, listingsData } from './data';
import constants from '../../../config/constants';
import { BoxWrapper } from '../../BoxWrapper/BoxWrapper';
import { Typography } from 'antd';

interface GraphProps {
  title: string
  graphName: string
  level: any
  action?: boolean
  childrens?: any
  styling?:any
}

export const AttendanceAndListingGraph = (props: GraphProps) => {
  const { title, graphName, level, action = false, childrens,styling } = props;
  const data = graphName === constants.ATTENDANCE ? attendanceData : listingsData;
  const maxValue = graphName === constants.ATTENDANCE ? 30 : 100;
  const yTicks = graphName === constants.ATTENDANCE ? 4 : 3;
  const colors: any = graphName === constants.ATTENDANCE ?
    ["#4A9D77", "#E94E5D", "#FFC15D"]
    :
    ["#E94E5D", "#4A9D77", "#FFC15D"];

  const attributeColors: any = graphName === constants.ATTENDANCE ?
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

  const config: any = {
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
      position: 'top-right',
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

  if (graphName === constants.ATTENDANCE) {
    delete config.yAxis.label;
    delete config.tooltip;
  }

  return (
    <div className="bg-white rounded-2xl p-5 wrapper-shadow">
      <div className='flex flex-row'>
        <Typography.Title level={level} >
          {title}
        </Typography.Title>

        {
          action &&
          <div className='ml-auto'>
            {childrens}
          </div>
        }
      </div>
      <Line style={styling} {...config} />
    </div>
  )
};