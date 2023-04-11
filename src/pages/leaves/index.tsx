
import "./style.scss";
import Internee from "./intern/index"
import CompanyAdmin from "./companyAdmin/index"
import Manger from "./manger/index"
import constants from "../../config/constants";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
const Leaves = () => {
  const { MANAGER, COMPANY_ADMIN, INTERN } = constants;
  const role: string = useRecoilValue(currentUserRoleState)
  switch (role) {
    case COMPANY_ADMIN: return <CompanyAdmin />
    case MANAGER: return <Manger userRole={role} />
    case INTERN: return <Internee />
    default: return <></>
  }
}

export default Leaves