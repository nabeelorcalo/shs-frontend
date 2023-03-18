import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import { IconButton } from '../IconButton';
import { ArrowToLeft, ArrowToRight1 } from '../../assets/images';
import { TopPerformanceCard } from '../TopPerformanceCard';
import { MonthChanger } from '../MonthChanger';
import './style.scss';

interface TopPerformanceProps {
  avatar: string
  name: string,
  profession?: string,
  percentage: string,
  data: any,
}

export const TopPerformanceList: any = (props: TopPerformanceProps) => {
  const [state, setState] = useState({
    currentMonthIndex: dayjs().month(),
    selectedMonth: dayjs().format("MMM"),
    data: [
      {
        id: 0,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 1,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 2,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 3,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 4,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 5,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 6,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 7,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
      {
        id: 8,
        name: "Maria Sanoid",
        profession: "UI UX Designer",
        percentage: "95%",
        avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      },
    ],
  });

  useEffect(() => {
    console.log(state.selectedMonth);
  }, [state.selectedMonth]);

  const changeMonth = (event: any) => {
    let btn = event.currentTarget.name;
    let monthIndex = state.currentMonthIndex;

    if (btn === "next" && monthIndex < 11)
      monthIndex++;
    else if (btn === "prev" && monthIndex > 0)
      monthIndex--;

    setState(prevState => ({
      ...prevState,
      currentMonthIndex: monthIndex,
      selectedMonth: dayjs().month(monthIndex).format('MMM'),
    }));
  }

  return (
    <BoxWrapper className='top-performance-list flex flex-col'>
      <div className='flex flex-row justify-center'>
        <Typography.Title level={4}>
          Top Performance
        </Typography.Title>

        <div className='flex items-center ml-auto'>
          <MonthChanger 
            month = {state.selectedMonth}
            onClick = {changeMonth}
          />
        </div>
      </div>

      <div className='performance-cards'>
        {
          state.data.map((item: any, idx: any) => {
            return <TopPerformanceCard
              avatar={item.avatar}
              name={item.name}
              profession={item.profession}
              percentage={item.percentage}
            />
          })
        }
      </div>
    </BoxWrapper>
  )
}