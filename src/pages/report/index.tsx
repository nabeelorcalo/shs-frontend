import { useState } from "react";
import constants from "../../config/constants";
import UniversitRep  from './UniversityRep'
import "./style.scss";

const Report = () => {
  const rederWthRole: any = {
    'University': <UniversitRep />,
   
  }
  return (
    <>
    {rederWthRole[constants.USER_ROLE]}
    </>
  )
}

export default Report