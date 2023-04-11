import { useState } from "react";
import { Outlet } from "react-router-dom";
import constants from "../../config/constants";
import Internee from "./Intrnee";
import Student from "./Student";
import "./style.scss";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../store";

const index = () => {
  const [role, setRole] = useRecoilState(currentUserState);
  console.log(role, 'role');
  const rederWthRole: any = {
    'INTERN': <Internee />,
    'STUDENT': <Student />,
  }
  return (
    <>
      {rederWthRole[role]}
    </>
  )
}

export default index