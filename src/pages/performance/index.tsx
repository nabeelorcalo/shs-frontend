import Intern from "./intern";
import CompanyAdmin from './CompanyAdmin';
import ManagerPerformance from "./Manager";
import "./style.scss";
import UniversityPerformance from "./UniversityRep";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";

const Performance = () => {
  const userRole = useRecoilValue(currentUserRoleState);

  const renderPage = (role: string) => {
    switch (role) {
      case 'INTERN':
        return <Intern />;
      case 'COMPANY_ADMIN':
        return <CompanyAdmin />;
      case 'COMPANY_MANAGER':
        return <ManagerPerformance />;
        case 'UNIVERSITY':
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