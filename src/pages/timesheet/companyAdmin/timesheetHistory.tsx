// import { useState } from 'react';
import { useParams } from 'react-router-dom'
// import { Collapse } from 'antd';
// import { ClockDarkIcon, TaskListIcon } from '../../../assets/images';
import CommonHeader from '../commonHeader';
import { timesheetMock } from '../mockData';
import CommonTableCollapsible from '../commonTableCollapsible/index';
// const { Panel } = Collapse;
import './style.scss';

const TimeSheetHistory = () => {

  const { id } = useParams();
  const findTimesheet = timesheetMock.find(timesheet => timesheet.id === id);

  return (
    <div className='timesheet-history'>
      <div className="timesheet-top-heading text-2xl flex items-center gap-4 font-semibold pb-[30px] mb-[30px] capitalize">
        history
        <span className='seperator'></span>
        <span className='font-medium text-base'>Certificate</span>
      </div>
      <CommonHeader />

      {findTimesheet?.history ? findTimesheet?.history.map((data) => (
        <CommonTableCollapsible
          id={data.id}
          dateTime={data.dateTime}
          totalTasks={data.totalTasks}
          totalTime={data.totalTime}
          tableData={data.taskDetails}
        />
      )) :
        <p className='font-medium opacity-[0.5] mt-[30px]'>No History Found...</p>
      }
    </div>
  )
}

export default TimeSheetHistory