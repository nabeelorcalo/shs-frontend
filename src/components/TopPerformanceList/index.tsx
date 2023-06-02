import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { BoxWrapper, Loader } from '../../components';
import { TopPerformanceCard } from '../TopPerformanceCard';
import { MonthChanger } from '../MonthChanger';
import './style.scss';

interface TopPerformanceProps {
  heading: string,
  data: any,
  action?: boolean,
  loading?: boolean
}

export const TopPerformanceList: any = (props: TopPerformanceProps) => {
  const { heading, data, action = false, loading=false } = props;

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
          <div className='flex items-start ml-auto'>
            <MonthChanger
              month={state.selectedMonth}
              onClick={changeMonth}
            />
          </div>
        }
      </div>
      {data && data?.length !== 0 &&
        <div className='performance-cards'>
          {
            data.map((item: any, idx: any) => {
              return <TopPerformanceCard
                avatar={item.avatar}
                name={item.userName}
                nameClassName="text-sm text-primary-color"
                profession={item.department}
                percentage={`${Math.round(item.sumOverallRating)}%`}
                isLate={item.isLate}
                checkInTime={item.checkInTime}
              />
            })
          }
        </div>
      }
      {loading &&
        <Loader />
      }
      
    </BoxWrapper>
  )
}