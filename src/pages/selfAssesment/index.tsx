import constants from "../../config/constants";
import Internee from "./Intrnee";
import "./style.scss";

const SelfAssesment = () => {
  const rederWthRole: any = {
    'Intern': <Internee />,
  }
  return (
    <>
      {rederWthRole[constants.USER_ROLE]}
    </>
  )
}

export default SelfAssesment