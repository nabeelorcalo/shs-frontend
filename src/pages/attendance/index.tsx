import { useState } from "react";
import CompanyAdminPerformance from "../attendance/CompanyAdmin";
import constants from "../../config/constants";
import "./style.scss";

const Attendance = () => {
  const renderPage = () => {
    switch (constants.USER_ROLE) {
      case 'CompanyAdmin':
        return <CompanyAdminPerformance />;
      case 'Intern':
        // return <CompanyAdmin />;
      case 'Manager':
        // return <ManagerPerformance />;
      default:
        return <></>;
    }
  }
  
  return (
    renderPage()
  )
}

export default Attendance;