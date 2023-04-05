import { useParams } from 'react-router-dom'
import CommonHeader from '../commonHeader';
import CommonTableCollapsible from '../commonTableCollapsible'
import { timesheetMock } from '../mockData';
import { Breadcrumb } from '../../../components';
import { useState } from 'react';

const ViewHistory = () => {

  const { id } = useParams();
  const [download, setDownload] = useState('');

  const findTimesheet = timesheetMock.find(timesheet => timesheet.id === id);

  return (
    <div className='view-history-wrapper'>

      <Breadcrumb breadCrumbData={[{ name: 'History' }, { name: 'Timesheet', onClickNavigateTo: '/timesheet' }]} />

      <CommonHeader hideUser download={download} setDownload={setDownload} />

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

export default ViewHistory