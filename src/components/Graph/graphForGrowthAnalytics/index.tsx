import React, { useState, useEffect, FC } from 'react';
import { Line } from '@ant-design/plots';
import growthAnalyticsData from './data';
import '../style.scss';
import { BoxWrapper } from '../../../components';
import { Row, Col } from 'antd';
import { CommonDatePicker } from '../../calendars/CommonDatePicker/CommonDatePicker';
import CommonRangePicker from '../../calendars/CommonDatePicker/CommonRangePicker';
import { CalendarPickerIcon } from '../../../assets/images';

interface IGrowthAnalyticsGraph {
  graphName: string;
  styling: any;
  isOpenRangePicker?: boolean;
  setIsOpenRangePicker?: any;
  onDateChange?: any;
  graphData: any[];
}

export const GrowthAnalyticsGraph: FC<IGrowthAnalyticsGraph> = (props) => {
  const {
    graphName,
    styling,
    setIsOpenRangePicker,
    isOpenRangePicker,
    graphData,
    onDateChange,
  } = props;
  const data = growthAnalyticsData;

  const attributeColors: any = {
    Interns: '#363565',
    Universities: '#E94E5D',
    Companies: '#9BD5E8',
    Agents: '#252D9B',
  };

  const config: any = {
    data: graphData,
    xField: 'date',
    yField: 'value',
    seriesField: 'name',
    color: ['#363565', '#E94E5D', '#9BD5E8', '#252D9B'],

    xAxis: {
      label: {
        offset: 30,
        formatter: (v: any) => {
          let date = v.split(' ');
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
        return { symbol: 'circle', style: { fill: attributeColors[name] } };
      },
    },

    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
  };

  return (
    <div className='bg-white rounded-2xl p-5 wrapper-shadow'>
      <Row justify='space-between' align='middle' className=' pb-[32px]'>
        <Col>
          <p className='font-semibold text-[20px] leading-[28px]'>
            {graphName}
          </p>
        </Col>
        <Col className='relative cursor-pointer'>
          <CommonRangePicker
            className={'common-range-picker-wrapper'}
            // picker='date'
            option={
              <div>
                <span className='mr-2'>
                  <CalendarPickerIcon />
                </span>
                date range
              </div>
            }
            open={isOpenRangePicker}
            setOpen={setIsOpenRangePicker}
            onChange={onDateChange}
          />
        </Col>
      </Row>
      <Line style={styling} {...config} />
    </div>
  );
};
