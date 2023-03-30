import Manager from "./Manager/index"
import constants from "../../config/constants";
import ManagerStructure from "./Manager/index";
import InternStructure from "./Intern";
import Structure from "./companyAdmin";

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