import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Manager from "./Manager/index"
import Structure from "./companyAdmin";
import ManagerStructure from "./Manager/index";
import InternStructure from "./Intern";
import constants from "../../config/constants";

const index = () => {
  const role = useRecoilValue(currentUserRoleState);
  const renderWthRole: any = {
    'CompanyAdmin': <Structure />,
    'Manager': <ManagerStructure />,
    'Intern': <InternStructure />,
  }
  return (
    <>
    {renderWthRole[role]}
    </>
  )
}
export default index