import { useState } from "react";
import { Outlet } from "react-router-dom";
import constants from "../../config/constants";
import Internee from "./Intrnee";
import Student from "./Student";
import "./style.scss";

const index = () => {
  const rederWthRole: any = {
    'Intern': <Internee />,
    'Student': <Student />,
  }
  return (
    <>
      {rederWthRole[constants.USER_ROLE]}
    </>
  )
}

export default index