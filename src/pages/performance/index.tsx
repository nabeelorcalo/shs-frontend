import Intern from "./intern";
import CompanyAdmin from './CompanyAdmin';
import ManagerPerformance from "./Manager";
import "./style.scss";
import UniversityPerformance from "./UniversityRep";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import constants from "../../config/constants";

const Performance = () => {
  const userRole = useRecoilValue(currentUserRoleState);

  const renderPage = (role: string) => {
    switch (role) {
      case constants.INTERN:
        return <Intern />;
      case constants.COMPANY_ADMIN:
        return <CompanyAdmin />;
      case constants.MANAGER:
        return <ManagerPerformance />;
        case constants.UNIVERSITY:
        return <UniversityPerformance />;
      default:
        return <></>;
    }
  }

  return (
    renderPage(userRole)
  )
}

export default Performance;