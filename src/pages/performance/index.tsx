import { useState } from "react";
import Intern from "./intern";
import CompanyAdmin from './CompanyAdmin';
import ManagerPerformance from "./Manager";
import constants from "../../config/constants";
import "./style.scss";
import UniversityPerformance from "./UniversityRep";

const Performance = () => {
  
  const renderPage = (role: string) => {
    switch (role) {
      case 'Intern':
        return <Intern />;
      case 'CompanyAdmin':
        return <CompanyAdmin />;
      case 'Manager':
        return <ManagerPerformance />;
        case 'University':
        return <UniversityPerformance />;
      default:
        return <></>;
    }
  }

  return (
    renderPage(constants.USER_ROLE)
  )
}

export default Performance;