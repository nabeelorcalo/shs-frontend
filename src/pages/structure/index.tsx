import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Structure from "./companyAdmin";
import ManagerStructure from "./Manager/index";
import InternStructure from "./Intern";

const index = () => {
  const role = useRecoilValue(currentUserRoleState);
  const renderWthRole: any = {
    'COMPANY_ADMIN': <Structure />,
    'COMPANY_MANAGER': <ManagerStructure />,
    'INTERN': <InternStructure />,
  }

  return (
    <>
    {renderWthRole[role]}
    </>
  )
}
export default index