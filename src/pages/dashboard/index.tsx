import { useState } from "react";
import Agent from "./agent";
import CompanyAdmin from "./companyAdmin";
import DelegateAgent from "../delegateAgent";
import Intern from "./intern";
import Manager from "./manager";
import Student from "./student";
import SystemAdmin from "./systemAdmin";
import University from "./university";
import constants from "../../config/constants";
import "./style.scss";

const Dashboard = () => {

  const renderRoleBasedDashboard = (role: string) => {
    switch (role) {
      case 'Agent':
        return <Agent />;
      case 'CompanyAdmin':
        return <CompanyAdmin />;
      case 'DelegateAgent':
        return <DelegateAgent />;
      case 'Intern':
        return <Intern />;
      case 'Manager':
        return <Manager />;
      case 'Student':
        return <Student />;
      case 'SystemAdmin':
        return <SystemAdmin />;
      case 'University':
        return <University />;
      default:
        return <></>;
    }
  }

  return (
    renderRoleBasedDashboard(constants.USER_ROLE)
  )
}

export default Dashboard