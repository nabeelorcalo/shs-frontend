import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MonthChanger, PageHeader } from "../../components";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import "./style.scss";

const Detail = () => {

  const [state, setState] = useState({
    currentDate: dayjs().locale('en'),
  });

  const breadCrumbs = () => {
    return (
      <Link
        className="bread-crumb"
        to={`/${ROUTES_CONSTANTS.ATTENDANCE}`}
      >
        Attendance
      </Link>
    )
  }

  const changeMonth = (event: any) => {
    let newDate: any;
    let btn = event.target.parentElement.name ?
    event.target.parentElement.name :
    event.target.name ? 
    event.target.name :
    event.target.parentElement.parentElement.name;

    if (btn === "next")
      newDate = state.currentDate.add(1, 'day');
    else if (btn === "prev")
      newDate = state.currentDate.subtract(1, 'day');

    setState(prevState => ({
      ...prevState,
      currentDate: newDate,
    }));
  }

  return (
    <div className="attendance-detail-container">
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            Attendance Detail
            <span className="vertical-line">
              {breadCrumbs()}
            </span>
          </div>
        }
        actions
        children={
          <MonthChanger
            month={state.currentDate.format('ddd, DD MMMM YYYY')}
            onClick={() => changeMonth(event)}
            datePickerClassName="min-w-0"
            hasDatePicker
          />
        }
      />
    </div>
  )
}

export default Detail;