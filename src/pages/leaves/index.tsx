import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
import Internee from "./intern/index"
import CompanyAdmin from "./companyAdmin/index"
import Manger from "./manger/index"
import Student from "./student/index"

const Leaves = () => {
  return (
    <>
      {/* <CompanyAdmin /> */}
      <Internee />
      {/* <Manger/>
      <Student/> */}
    </>

  )
}

export default Leaves