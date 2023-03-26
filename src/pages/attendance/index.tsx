import { useState } from "react";
import CompanyAdminAttendance from "../attendance/CompanyAdmin";
import ManagerAttendance from "../attendance/Manager";
import InternAttendance from "../attendance/Intern";
import constants from "../../config/constants";
import "./style.scss";

const Attendance = () => {
  const renderPage = () => {
    switch (constants.USER_ROLE) {
      case 'CompanyAdmin':
        return <CompanyAdminAttendance />;
      case 'Intern':
        return <InternAttendance />;
      case 'Manager':
        return <ManagerAttendance />;
      default:
        return <></>;
    }
  }
  
  return (
    renderPage()
  )
}

export default Attendance;