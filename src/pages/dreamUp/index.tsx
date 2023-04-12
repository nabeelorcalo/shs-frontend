import constants from "../../config/constants";
import Internee from "./Intrnee";
import Student from "./Student";
import "./style.scss";
import {useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";

const index = () => {
  const { INTERN,STUDENT } = constants;
  const role: string = useRecoilValue(currentUserRoleState)
  switch (role) {
    case STUDENT: return <Student />
    case INTERN: return <Internee />
    default: return <></>
  }
}

export default index