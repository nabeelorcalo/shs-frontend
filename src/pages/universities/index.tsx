import { useState } from "react";
import "./style.scss";
import SystemAdmin from "./SystemAdmin/index"
import constants from "../../config/constants";
import CompanyAdmin from './CompanyAdmin/index'

const Universities = () => {
  const rederWthRole: any = {
    'CompanyAdmin': <CompanyAdmin/>,
    'SystemAdmin':  <SystemAdmin/>
  }
  return (
    <>
    
      {rederWthRole[constants.USER_ROLE]}
    </>
  )
}
export default Universities
