import CommonHeader from '../commonHeader';
import CommonTableCollapsible from '../commonTableCollapsible'
import { timesheetMock } from '../mockData';
import { Breadcrumb } from '../../../components';
import { Fragment, useState } from 'react';
import { ROUTES_CONSTANTS } from '../../../config/constants';

const ViewHistory = () => {

  const [download, setDownload] = useState('');

  return (
    <div className='view-history-wrapper'>

      <Breadcrumb breadCrumbData={[{ name: 'History' }, { name: 'Timesheet', onClickNavigateTo: `/${ROUTES_CONSTANTS.TIMESHEET}` }]} />

      <CommonHeader hideUser download={download} setDownload={setDownload} />

      {timesheetMock ? timesheetMock.map(({ history }: any, i: number) => (
        <Fragment key={i}>
          {
            history && history?.map((data: any) => (
              <CommonTableCollapsible
                key={data.id}
                id={data.id}
                dateTime={data.dateTime}
                totalTasks={data.totalTasks}
                totalTime={data.totalTime}
                tableData={data.taskDetails}
              />
            ))
          }
        </Fragment>
      )) :
        <p className='font-medium opacity-[0.5] mt-[30px]'>No History Found...</p>
      }
    </div>
  )
}

export default ViewHistory