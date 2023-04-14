import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Manager from "./Manager/index"
import CompanyAdmin from "./CompanyAdmin/index"
import Intern from "./Intern"

const Grievances = () => {
  const role = useRecoilValue(currentUserRoleState);

  const rederWthRole: any = {
    'COMPANY_ADMIN': <CompanyAdmin />,
    'COMPANY_MANAGER': <Manager />,
    'INTERN': <Intern />
  }
  return (
    <>
      {rederWthRole[role]}
    </>
  )
}

export default Grievances