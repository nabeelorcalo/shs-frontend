import { useState } from "react";
import Intern from "./intern";
import CompanyAdmin from './CompanyAdmin';
import constants from "../../config/constants";
import "./style.scss";

const Performance = () => {
  const renderPage = (role: string) => {
    switch (role) {
      case 'Intern':
        return <Intern />;
      case 'CompanyAdmin':
        return <CompanyAdmin />;
      default:
        return <></>;
    }
  }

  return (
    renderPage(constants.USER_ROLE)
  )
}

export default Performance;