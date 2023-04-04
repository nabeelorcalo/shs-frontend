// import { useState } from 'react';
import { useParams } from 'react-router-dom'
// import { Collapse } from 'antd';
// import { ClockDarkIcon, TaskListIcon } from '../../../assets/images';
import CommonHeader from '../commonHeader';
import { timesheetMock } from '../mockData';
import CommonTableCollapsible from '../commonTableCollapsible/index';
// const { Panel } = Collapse;
import './style.scss';
import { Breadcrumb } from '../../../components';

const TimeSheetHistory = () => {

  const { id } = useParams();
  const findTimesheet = timesheetMock.find(timesheet => timesheet.id === id);

  return (
    <div className='timesheet-history'>
      <Breadcrumb breadCrumbData={[{ name: 'History' }, { name: 'Timesheet', onClickNavigateTo: '/timesheet' }]} />
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