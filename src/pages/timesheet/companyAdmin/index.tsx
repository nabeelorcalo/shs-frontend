import { useNavigate } from "react-router-dom";
import { ContractCard } from "../../../components/ContractCard/ContractCard";
import CommonHeader from "../commonHeader";
import { timesheetMock } from "../mockData";
import "./style.scss";
import { PageHeader } from "../../../components";
import { useState } from "react";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { useRecoilState } from "recoil";
import { timeSheetAtom } from "../../../store/timesheet";

const CompanyAdmin = () => {
  const action = useCustomHook();
  const navigate = useNavigate();
  const [download, setDownload] = useState('');

  const [data, setData] = useRecoilState(timeSheetAtom);
  console.log(data);
  

  const PdfHeader = ['No', 'User Name', 'Designation', 'Total Hours', 'Progress', 'Worked Hours'];

  const PdfBody = timesheetMock.map(({ id, userName, designation, totalHours, progess, workedHours }: any) =>
    [id, userName, designation, totalHours, `${progess}%`, workedHours]
  );

  return (
    <div className="timesheet-wrapper">
      <PageHeader title='Timesheet' bordered />

      <CommonHeader download={download}
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