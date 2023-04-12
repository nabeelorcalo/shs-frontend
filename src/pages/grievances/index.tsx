import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Manager from "./Manager/index"
import CompanyAdmin from "./CompanyAdmin/index"
import Intern from "./Intern"
import constants from "../../config/constants";
import "./style.scss";

const Grievances = () => {
  const role = useRecoilValue(currentUserRoleState);

  const rederWthRole: any = {
    'CompanyAdmin': <CompanyAdmin />,
    'Manager': <Manager />,
    'Intern': <Intern />
  }
  return (
    <>
      {rederWthRole[role]}
    </>
  )
}

export default Grievances