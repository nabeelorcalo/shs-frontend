import Manager from "./Manager/index"
import CompanyAdmin from "./CompanyAdmin/index"
import constants from "../../config/constants";
import "./style.scss";
const Grievances = () => {

  const rederWthRole: any = {
    'CompanyAdmin': <CompanyAdmin />,
    'Manager': <Manager />,
  }
  return (
    <>
    {rederWthRole[constants.USER_ROLE]}
    </>
  )
}

export default Grievances