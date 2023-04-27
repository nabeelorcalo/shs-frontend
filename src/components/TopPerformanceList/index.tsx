import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { BoxWrapper } from '../../components';
import { IconButton } from '../IconButton';
import { ArrowToLeft, ArrowToRight1 } from '../../assets/images';
import { TopPerformanceCard } from '../TopPerformanceCard';
import { MonthChanger } from '../MonthChanger';
import './style.scss';

interface TopPerformanceProps {
  heading: string,
  data: any,
  action?: boolean,
}

export const TopPerformanceList: any = (props: TopPerformanceProps) => {
  const { heading, data, action = false } = props;

  const [state, setState] = useState({
    currentMonthIndex: dayjs().month(),
    selectedMonth: dayjs().format("MMM"),
    data: data
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
      <div className='flex flex-row h-[40px] top-perfomers-main'>
        <p className='font-medium text-xl title-color'>
          {heading}
        </p>

        {
          action &&
          <div className='flex items-center ml-auto'>
            <MonthChanger
              month={state.selectedMonth}
              onClick={changeMonth}
            />
          </div>
        }
      </div>

      <div className='performance-cards'>
        {
          state.data.map((item: any, idx: any) => {
            return <TopPerformanceCard
              avatar={item.avatar}
              name={item.name}
              nameClassName="text-sm text-primary-color"
              profession={item.profession}
              percentage={item.percentage}
              isLate={item.isLate}
              checkInTime={item.checkInTime}
            />
          })
        }
      </div>
    </BoxWrapper>
  )
}