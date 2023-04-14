import { useRecoilValue } from "recoil";
import constants from "../../config/constants";
import { currentUserRoleState } from "../../store";
import Internee from "./Intrnee";
import "./style.scss";
const SelfAssesment = () => {
  const { INTERN } = constants;
  const role: string = useRecoilValue(currentUserRoleState)
  switch (role) {
    case INTERN: return <Internee />
    default: return <></>
  }
}
export default SelfAssesment