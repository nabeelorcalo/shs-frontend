import { useParams } from 'react-router-dom'
import CommonHeader from '../commonHeader';
import { timesheetMock } from '../mockData';
import CommonTableCollapsible from '../commonTableCollapsible/index';
import './style.scss';
import { Breadcrumb } from '../../../components';
import { useState } from 'react';
import { ROUTES_CONSTANTS } from '../../../config/constants';

const TimeSheetHistory = () => {

  const { id } = useParams();
  const [download, setDownload] = useState('');
  const findTimesheet = timesheetMock.find(timesheet => timesheet.id === id);

  return (
    <div className='timesheet-history'>
      <Breadcrumb breadCrumbData={[{ name: 'History' }, { name: 'Timesheet', onClickNavigateTo: `/${ROUTES_CONSTANTS.TIMESHEET}` }]} />
      <CommonHeader download={download} setDownload={setDownload} />

      {findTimesheet?.history ? findTimesheet?.history.map((data) => (
        <CommonTableCollapsible
          activeKey={download === 'pdf' ? data.id : ''}
          key={data.id}
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