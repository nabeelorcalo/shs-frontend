import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import SystemAdmin from "./SystemAdmin/index";
import CompanyAdmin from './CompanyAdmin/index';
import "./style.scss";

const Universities = () => {
  const role = useRecoilValue(currentUserRoleState);
  const renderWthRole: any = {
    'COMPANY_ADMIN': <CompanyAdmin />,
    'SYS_ADMIN': <SystemAdmin />
  }

  return (
    <>
      {renderWthRole[role]}
    </>
  )
}
export default Universities
