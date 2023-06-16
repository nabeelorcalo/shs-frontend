import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import ManagerStructure from "./Manager/index";
import InternStructure from "./Intern";
import CompanyAdminStructure from "./companyAdmin";
import Structure from "./structure-tree/structure";

const index = () => {
  const role = useRecoilValue(currentUserRoleState);
  // const renderWthRole: any = {
  //   'COMPANY_ADMIN': <CompanyAdminStructure/>,
  //   'COMPANY_MANAGER': <ManagerStructure />,
  //   'INTERN': <InternStructure />,
  // }

  return (
    <Structure />
  )
}
export default index