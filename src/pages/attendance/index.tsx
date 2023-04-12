import CompanyAdminAttendance from "../attendance/CompanyAdmin";
import ManagerAttendance from "../attendance/Manager";
import InternAttendance from "../attendance/Intern";
import "./style.scss";
import UniversityAttendance from "./University";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";

const Attendance = () => {
  const userRole = useRecoilValue(currentUserRoleState);
  const renderPage = () => {
    switch (userRole) {
      case 'COMPANY_ADMIN':
        return <CompanyAdminAttendance />;
      case 'INTERN':
        return <InternAttendance />;
      case 'COMPANY_MANAGER':
        return <ManagerAttendance />;
        case 'UNIVERSITY':
        return <UniversityAttendance />;
      default:
        return <></>;
    }
  }
  
  return (
    renderPage()
  )
}

export default Attendance;