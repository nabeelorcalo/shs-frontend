import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { Collapse } from 'antd';
import { CircleMinusIcon, CirclePlusIcon, ClockDarkIcon, TaskListIcon } from '../../../assets/images';
import CommonHeader from '../commonHeader';
import TimesheetTable from './timesheetTable';
import { timesheetMock } from './mockData';
const { Panel } = Collapse;
import './style.scss';

const TimeSheetHistory = () => {

  const { id } = useParams();
  const findTimesheet = timesheetMock.find(timesheet => timesheet.id === id);
  const [toggle, setToggle] = useState({ open: false, id: '' });

  const RenderPanel = (props: any) => {
    const { dateTime, totalTasks, totalTime } = props;
    return (
      <div className='flex flex-wrap items-center'>
        <div className="flex items-center gap-3 capitalize">
          <p className='w-[220px]'>{dateTime}</p>
          <div className="seperator"></div>
          <div className="flex items-center">
            <TaskListIcon className='mr-[10px]' />
            <p className='tasks'>Tasks: &nbsp;
              {totalTasks < 10 ? `0${totalTasks}` : totalTasks}
            </p>
          </div>
          <div className="seperator"></div>
          <div className="flex items-center">
            <ClockDarkIcon className='mr-[10px]' />
            <p className='tasks'>{totalTime}</p>
          </div>
        </div>
        <div className='flex-1 text-end'>

        </div>
      </div>
    )
  }

  return (
    <div className='timesheet-history'>
      <div className="timesheet-top-heading text-2xl flex items-center gap-4 font-semibold pb-[30px] mb-[30px] capitalize">
        history
        <span className='seperator'></span>
        <span className='font-medium text-base'>Certificate</span>
      </div>
      <CommonHeader />

      {findTimesheet?.history ? findTimesheet?.history.map((data) => (
        <Collapse size='large'
          expandIcon={toggle.open && data.id === toggle.id[0] ? CircleMinusIcon : CirclePlusIcon}
          onChange={(e: any) => setToggle({ open: true, id: e })}
          className={` bg-white border-0 history-detail rounded-[16px] mt-[10px]`}
        >
          <Panel header={
            <RenderPanel
              dateTime={data.dateTime}
              totalTasks={data.totalTasks}
              totalTime={data.totalTime}
            />
          } key={data.id}>
            <TimesheetTable tableData={data.taskDetails} />
          </Panel>
        </Collapse>
      )) :
        <p className='font-medium opacity-[0.5] mt-[30px]'>No History Found...</p>
      }
    </div>
  )
}

export default TimeSheetHistory