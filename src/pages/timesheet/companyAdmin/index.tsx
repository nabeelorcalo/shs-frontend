import { useNavigate } from "react-router-dom";
import { ContractCard } from "../../../components/ContractCard/ContractCard";
import CommonHeader from "../commonHeader";
import { timesheetMock } from "./mockData";
import "./style.scss";

const CompanyAdmin = () => {
  const navigate = useNavigate();
  return (
    <div className="timesheet-wrapper">
      <div className="timesheet-top-heading text-2xl font-semibold pb-[30px] mb-[30px]">
        Timesheets
      </div>
      <CommonHeader />

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
          handleViewAll={() => navigate(`/timesheet/history/${data.id}`)}
        />
      ))}

    </div>
  )
}

export default CompanyAdmin