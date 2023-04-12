import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import { useState } from "react";
import SystemAdmin from "./SystemAdmin/index";
import CompanyAdmin from './CompanyAdmin/index';
import constants from "../../config/constants";
import "./style.scss";

const Universities = () => {
  const role = useRecoilValue(currentUserRoleState);
  const renderWthRole: any = {
    'CompanyAdmin': <CompanyAdmin />,
    'SystemAdmin': <SystemAdmin />
  }

  return (
    <>
      {renderWthRole[role]}
    </>
  )
}
export default Universities
