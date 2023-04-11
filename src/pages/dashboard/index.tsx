import Agent from "./agent";
import CompanyAdmin from "./companyAdmin";
import DelegateAgent from "./delegateAgent";
import Intern from "./intern";
import Manager from "./manager";
import Student from "./student";
import SystemAdmin from "./systemAdmin";
import University from "./university";
import constants from "../../config/constants";
import "./style.scss";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";

// gutter for spacing in dashboard items
export const gutter: any = [
  { xs: 16, sm: 16, lg: 20, xxl: 30 },
  { xs: 16, sm: 16, lg: 20, xxl: 30 },
];

const Dashboard = () => {
  const { AGENT, MANAGER, COMPANY_ADMIN, DELEGATE_AGENT, STUDENT, SYSTEM_ADMIN, UNIVERSITY, INTERN } = constants;
  const role = useRecoilValue(currentUserRoleState)
  const renderRoleBasedDashboard = (role: string) => {
    switch (role) {
      case AGENT:
        return <Agent />;
      case COMPANY_ADMIN:
        return <CompanyAdmin />;
      case DELEGATE_AGENT:
        return <DelegateAgent />;
      case INTERN:
        return <Intern />;
      case MANAGER:
        return <Manager />;
      case STUDENT:
        return <Student />;
      case SYSTEM_ADMIN:
        return <SystemAdmin />;
      case UNIVERSITY:
        return <University />;
      default:
        return <></>;
    }
  }

  return (
    renderRoleBasedDashboard(role)
  )
}

export default Dashboard