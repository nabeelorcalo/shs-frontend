import { useState } from "react";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Manager from "./Manager/index"
import CompanyAdmin from "./CompanyAdmin/index"
import constants from "../../config/constants";
import "./style.scss";

const CaseStudies = () => {
  const role = useRecoilValue(currentUserRoleState);
  const rederWthRole: any = {
    'COMPANY_ADMIN': <CompanyAdmin/>,
    'COMPANY_MANAGER': <Manager />,
  }
  return (
    <>
    {rederWthRole[role]}
    </>
  )
}

export default CaseStudies