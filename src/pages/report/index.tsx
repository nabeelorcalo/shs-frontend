import { useState } from "react";
import constants from "../../config/constants";
import UniversitRep  from './UniversityRep'
import "./style.scss";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";

const Report = () => {
  const role = useRecoilValue(currentUserRoleState);
  const renderWthRole: any = {
    'UNIVERSITY': <UniversitRep />,
  }

  return (
    <>
    {renderWthRole[role]}
    </>
  )
}

export default Report