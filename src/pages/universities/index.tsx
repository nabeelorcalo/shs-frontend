import { useState } from "react";
import "./style.scss";
import UniveristyMain from "./univeristyMain"
import constants from "../../config/constants";
import CompanyAdmin from './CompanyAdmin/index'

const Universities = () => {
  const rederWthRole: any = {
    'CompanyAdmin': <CompanyAdmin/>,
  }
  return (
    <>
      {/* <UniveristyMain/> */}
      {rederWthRole[constants.USER_ROLE]}
    </>
  )
}
export default Universities
