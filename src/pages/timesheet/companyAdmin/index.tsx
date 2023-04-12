import { useNavigate } from "react-router-dom";
import { ContractCard } from "../../../components/ContractCard/ContractCard";
import CommonHeader from "../commonHeader";
import { timesheetMock } from "../mockData";
import "./style.scss";
import { PageHeader } from "../../../components";
import { useState } from "react";
import { downloadPDF } from "../../../components/pdfExcelDownload";
import { ROUTES_CONSTANTS } from "../../../config/constants";

const CompanyAdmin = () => {
  const navigate = useNavigate();
  const [download, setDownload] = useState('');

  const handleDownload = (val: string) => {
    setDownload(val);
    downloadPDF('timesheet-pdf-download');
  }

  return (
    <div className="timesheet-wrapper">
      <PageHeader title='Timesheet' bordered />

      <CommonHeader download={download} setDownload={handleDownload} />

      <div id="timesheet-pdf-download">
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

    </div>
  )
}

export default CompanyAdmin