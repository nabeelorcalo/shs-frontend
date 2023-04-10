import { useParams } from 'react-router-dom'
import CommonHeader from '../commonHeader';
import { timesheetMock } from '../mockData';
import CommonTableCollapsible from '../commonTableCollapsible/index';
import './style.scss';
import { Breadcrumb } from '../../../components';
import { useState } from 'react';
import { ROUTES_CONSTANTS } from '../../../config/constants';
import useCustomHook from '../actionHandler';

const TimeSheetHistory = () => {
  const action = useCustomHook();
  const { id } = useParams();
  const findTimesheet = timesheetMock.find(timesheet => timesheet.id === id);

  const PdfHeader = ['Date', 'Total Tasks', 'Total Time'];
  const PdfInnerHeader = ['Task Name', 'Category', 'Date', 'Start Time', 'End Time'];

  const PdfBody = findTimesheet?.history?.map(({ id, userName, designation, totalHours, progess, workedHours }: any) =>
    [id, userName, designation, totalHours, `${progess}%`, workedHours]
  );

  return (
    <div className='timesheet-history'>
      <Breadcrumb breadCrumbData={[{ name: 'History' }, { name: 'Timesheet', onClickNavigateTo: `/${ROUTES_CONSTANTS.TIMESHEET}` }]} />
      <CommonHeader
        setDownload={(val: string) =>
          action.downloadNestedTable(event, PdfHeader, PdfInnerHeader, findTimesheet?.history, 'Timesheet-Detail-History', PdfBody)
        }
      />

      {findTimesheet?.history ? findTimesheet?.history.map((data) => (
        <CommonTableCollapsible
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