import Manager from "./Manager/index"
import constants from "../../config/constants";
import Structure from "./companyAdmin";
import ManagerStructure from "./Manager/index";
import InternStructure from "./Intern";
const index = () => {

  const rederWthRole: any = {
    'CompanyAdmin': <Structure />,
    'Manager': <ManagerStructure />,
    'Intern': <InternStructure />,

  }
  return (
    <>
    {rederWthRole[constants.USER_ROLE]}
    </>
  )
}
export default index