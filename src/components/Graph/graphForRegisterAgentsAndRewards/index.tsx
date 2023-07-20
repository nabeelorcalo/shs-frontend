import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { Row, Col, Divider } from 'antd';
import { registerAgentsData, rewardsData } from './data';
import constants from '../../../config/constants';
import '../style.scss';
import { useRecoilState } from 'recoil';
import { getDelegateAdminState } from '../../../store/delegate';
import useCustomHook from '../actionHandler';
import dayjs from 'dayjs';

export const RegisterAgentsAndRewardGraph = ({ graphName }: any) => {
  const action = useCustomHook();
  const tweleveMonthAgo = dayjs().subtract(11,'month')
  const [delegateAdmin, setDelegateAdmin] = useRecoilState<any>(getDelegateAdminState);
  const data = graphName === constants.REGISTER_AGENTS ? delegateAdmin.graphData ?? [] : delegateAdmin.rewardsGraph?.map((item: any,index:any) => (
    {
      ...item, month : tweleveMonthAgo.add(index,'month').format('MMM')
    }
  ))??[];
  const color = graphName === constants.REGISTER_AGENTS ? "#4A9D77" : '#E94E5D';
  const bgClass = graphName === constants.REGISTER_AGENTS ?
    "green-graph-tooltip-bg white-color"
    :
    "red-graph-tooltip-bg white-color";
  
  useEffect(() => {
    action.getDelegateAdmin()
  },[])

  const RegisterAgentsToolip = (props: any) => {
    const { items } = props;
    
    return (
      <div className={`flex flex-col h-[167px] w-[262px] rounded-lg ${bgClass}`}>
        <p className='ml-auto mr-auto p-[12px] font-semibold'>Total Agents</p>
        <Divider className='m-0 bg-white' />
        <div className='pl-4 pb-2'>
          <div className='flex flex-row'>
            <div className='flex-col flex-none w-[90px] pt-[20px]'>
              <p className='font-normal'>Universities</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalUniversities}</p>
            </div>

            <div className='flex-col flex-none w-[85px] pt-[20px]'>
              <p className='font-normal'>Interns</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalInterns}</p>
            </div>

            <div className='flex-col flex-none w-[85px] pt-[20px]'>
              <p className='font-normal'>Students</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalStudents}</p>
            </div>
          </div>

          <div className='flex flex-row'>
            <div className='flex-col flex-none w-[90px] pt-[22px]'>
              <p className='font-normal'>Companies</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalCompanies}</p>
            </div>

            <div className='flex-col flex-none w-full pt-[22px]'>
              <p className='font-normal'>Delegate Agents</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalDelegates}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const RewardToolip = (props: any) => {
    const { items } = props;

    return (
      <div className={`flex flex-col h-[167px] w-[262px] rounded-lg ${bgClass}`}>
        <p className='ml-auto mr-auto p-[12px] font-semibold'>Rewards</p>
        <Divider className='m-0 white-bg-color' />
        <div className='px-4 pb-2'>
          <div className='flex flex-row'>
            <div className='flex-col flex-none w-[90px] pt-[20px]'>
              <p className='font-normal'>Universities</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalUniversityRewards}</p>
            </div>

            <div className='flex-col flex-none w-[85px] pt-[20px]'>
              <p className='font-normal'>Interns</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalInternRewards}</p>
            </div>

            <div className='flex-col flex-none w-[85px] pt-[18px]'>
              <p className='font-normal'>Students</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalStudentRewards}</p>
            </div>
          </div>

          <div className='flex flex-row'>
            <div className='flex-col flex-none w-[90px] pt-[22px]'>
              <p className='font-normal'>Companies</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalCompanyRewards}</p>
            </div>

            <div className='flex-col flex-none w-full pt-[18px]'>
              <p className='font-normal'>Delegate Agents</p>
              <p className='pt-2 font-semibold'>{items[0]?.data?.totalDelegateRewards}</p>
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
    yField: graphName === constants.REGISTER_AGENTS ? 'totalAgents' : 'totalRewards',
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
      // min: 0,
      // max: 100,
      tickCount: 3,
      label: {
        formatter: (value: any) => {
          return `${value}`;
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