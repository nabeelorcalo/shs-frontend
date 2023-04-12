import Manager from "./Manager/index"
import CompanyAdmin from "./CompanyAdmin/index"
import Intern from "./Intern"
import constants from "../../config/constants";
import "./style.scss";

const Grievances = () => {
  const rederWthRole: any = {
    'CompanyAdmin': <CompanyAdmin />,
    'Manager': <Manager />,
    'Intern' : <Intern/>
  }
  return (
    <>
    {rederWthRole[constants.USER_ROLE]}
    </>
  )
}

export default Grievances