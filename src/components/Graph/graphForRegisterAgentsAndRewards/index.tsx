import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { Row, Col, Divider } from 'antd';
import { registerAgentsData, rewardsData } from './data';
import constants from '../../../config/constants';
import '../style.scss';

const Graph = ({ graphName }: any) => {
  const data = graphName === constants.REGISTER_AGENTS ? registerAgentsData : rewardsData;
  const color = graphName === constants.REGISTER_AGENTS ? "#4A9D77" : '#E94E5D';
  const bgClass = graphName === constants.REGISTER_AGENTS ?
    "green-graph-tooltip-bg white-color"
    :
    "red-graph-tooltip-bg white-color";

  const RegisterAgentsToolip = (props: any) => {
    return (
      <div className={`flex flex-col h-[167px] w-[262px] rounded-lg ${bgClass}`}>
        <p className='ml-auto mr-auto p-[12px] font-semibold'>Total Agents</p>
        <Divider className='m-0 bg-white' />
        <div className='pl-4 pb-2'>
          <div className='flex flex-row'>
            <div className='flex-col flex-none w-[90px] pt-[20px]'>
              <p className='font-normal'>Universities</p>
              <p className='pt-2 font-semibold'>05</p>
            </div>

            <div className='flex-col flex-none w-[85px] pt-[20px]'>
              <p className='font-normal'>Interns</p>
              <p className='pt-2 font-semibold'>01</p>
            </div>

            <div className='flex-col flex-none w-[85px] pt-[20px]'>
              <p className='font-normal'>Students</p>
              <p className='pt-2 font-semibold'>02</p>
            </div>
          </div>

          <div className='flex flex-row'>
            <div className='flex-col flex-none w-[90px] pt-[22px]'>
              <p className='font-normal'>Companies</p>
              <p className='pt-2 font-semibold'>10</p>
            </div>

            <div className='flex-col flex-none w-full pt-[22px]'>
              <p className='font-normal'>Delegate Agents</p>
              <p className='pt-2 font-semibold'>02</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const RewardToolip = (props: any) => {
    return (
      <div className={`flex flex-col h-[167px] w-[262px] rounded-lg ${bgClass}`}>
        <p className='ml-auto mr-auto p-[12px] font-semibold'>Rewards</p>
        <Divider className='m-0 bg-white' />
        <div className='px-4 pb-2'>
          <div className='flex flex-row'>
            <div className='flex-col flex-none w-[90px] pt-[20px]'>
              <p className='font-normal'>Universities</p>
              <p className='pt-2 font-semibold'>$10000</p>
            </div>

            <div className='flex-col flex-none w-[85px] pt-[20px]'>
              <p className='font-normal'>Interns</p>
              <p className='pt-2 font-semibold'>$10000</p>
            </div>

            <div className='flex-col flex-none w-[85px] pt-[18px]'>
              <p className='font-normal'>Students</p>
              <p className='pt-2 font-semibold'>$10000</p>
            </div>
          </div>

          <div className='flex flex-row'>
            <div className='flex-col flex-none w-[90px] pt-[22px]'>
              <p className='font-normal'>Companies</p>
              <p className='pt-2 font-semibold'>$10000</p>
            </div>

            <div className='flex-col flex-none w-full pt-[18px]'>
              <p className='font-normal'>Delegate Agents</p>
              <p className='pt-2 font-semibold'>$10000</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const CutomTooltip = (props: any) => {
    return (
      <>
        {
          graphName === constants.REGISTER_AGENTS ?
            <RegisterAgentsToolip {...props} /> :
            <RewardToolip {...props} />
        }
      </>
    );
  }

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    color: color,
    smooth: true,
    className: `${graphName}`,

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
      tickLine: null,
    },

    yAxis: {
      min: 0,
      max: 100,
      tickCount: 3,
      label: {
        formatter: (value: any) => {
          return `${value}%`;
        },
      },
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

    areaStyle: {
      fillOpacity: 0.25,
    },

    meta: {
      month: {
        nice: true,
        range: [0, 1],
      },
    },

    tooltip: {
      customContent: (title: any, items: any) => <CutomTooltip title={title} items={items} />,
    },
  };

  return <Area {...config} />;
};

export default Graph;