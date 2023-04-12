import CompanyAdminAttendance from "../attendance/CompanyAdmin";
import ManagerAttendance from "../attendance/Manager";
import InternAttendance from "../attendance/Intern";
import "./style.scss";
import UniversityAttendance from "./University";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import constants from "../../config/constants";

const Attendance = () => {
  const userRole = useRecoilValue(currentUserRoleState);
  const renderPage = () => {
    switch (userRole) {
      case constants.COMPANY_ADMIN:
        return <CompanyAdminAttendance />;
      case constants.INTERN:
        return <InternAttendance />;
      case constants.MANAGER:
        return <ManagerAttendance />;
        case constants.UNIVERSITY:
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