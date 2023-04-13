import { useNavigate } from "react-router-dom";
import { ContractCard } from "../../../components/ContractCard/ContractCard";
import CommonHeader from "../commonHeader";
import { timesheetMock } from "../mockData";
import { PageHeader, SearchBar } from "../../../components";
import { useEffect, useState } from "react";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { useAPiHook } from "./actionHandler";
import endpoints from "../../../config/apiEndpoints";
import "./style.scss";

const CompanyAdmin = () => {
  const { TIMRSHEET_FINDALL } = endpoints;
  const action = useCustomHook();
  const navigate = useNavigate();
  const { timeSheetData, getData } = useAPiHook();
  const PdfHeader = ['No', 'User Name', 'Designation', 'Total Hours', 'Progress', 'Worked Hours'];
  const PdfBody = timesheetMock.map(({ id, userName, designation, totalHours, progess, workedHours }: any) =>
    [id, userName, designation, totalHours, `${progess}%`, workedHours]
  );

  useEffect(() => {
    getData(TIMRSHEET_FINDALL)
  }, [])

  return (
    <div className="timesheet-wrapper">
      <PageHeader title='Timesheet' bordered />
      <CommonHeader
        setDownload={() => action.downloadPdfOrCsv(event, PdfHeader, timesheetMock, 'Timesheet-History', PdfBody)}
      />
      {timesheetMock.map((data, i) => (
        <ContractCard key={i}
          className='mt-[30px] timesheet-work-history'
          cardWithProgressBar
          userName={data.userName}
          designation={data.designation}
          userImg={data.userImg}
          progress={data.progess}
          strokeColor={'#3DC575'}
          totalHours={data.totalHours}
          workedHours={data.workedHours}
          handleViewAll={() => navigate(`/${ROUTES_CONSTANTS.TIMESHEETHISTORY}/${data.id}`)}
        />
      ))}
    </div>
  )
}

export default CompanyAdmin