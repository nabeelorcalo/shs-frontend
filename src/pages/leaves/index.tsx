
import "./style.scss";
import Internee from "./intern/index"
import CompanyAdmin from "./companyAdmin/index"
import Manger from "./manger/index"
import Student from "./student/index"
import constants from "../../config/constants";

const Leaves = () => {

  const rederWthRole: any = {
    'CompanyAdmin': <CompanyAdmin />,
    'Intern': <Internee />,
    'Student': <Student />,
    'Manager': <Manger />,
  }

  return (
    <>
      {rederWthRole[constants.USER_ROLE]}
    </>

  )
}

export default Leaves