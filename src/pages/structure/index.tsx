import Manager from "./Manager/index"
import CompanyAdmin from "./CompanyAdmin/index"
import constants from "../../config/constants";
const Structure = () => {

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
export default Structure