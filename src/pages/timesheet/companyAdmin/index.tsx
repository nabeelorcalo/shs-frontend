import { useNavigate } from "react-router-dom";
import { ContractCard } from "../../../components/ContractCard/ContractCard";
import CommonHeader from "../commonHeader";
import { timesheetMock } from "../mockData";
import { DropDown, PageHeader } from "../../../components";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import "./style.scss";
import { useState } from "react";

const CompanyAdmin = () => {
  const action = useCustomHook();
  const navigate = useNavigate();
  const PdfHeader = ['No', 'User Name', 'Designation', 'Total Hours', 'Progress', 'Worked Hours'];
  const PdfBody = timesheetMock.map(({ id, userName, designation, totalHours, progess, workedHours }: any) =>
    [id, userName, designation, totalHours, `${progess}%`, workedHours]
  );

  const [value, setValue] = useState('');
  const [dateValue, setDateValue] = useState('')
  console.log(value);

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
      <DropDown
        value={value}
        options={['option 1', 'option 2', 'range picker']}
        requireRangePicker
        showDatePickerOnVal={'range picker'}
        setValue={(val: string) => setValue(val)}
      />

      <DropDown
        value={dateValue}
        options={['option 1', 'option 2', 'custom']}
        requireDatePicker
        showDatePickerOnVal={'custom'}
        setValue={(val: string) => setDateValue(val)}
      />
    </div>
  )
}

export default CompanyAdmin