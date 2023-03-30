import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentMain from "./studentMain";
import "./style.scss";

const Students = () => {
  return (
    <StudentMain/>
  )
}

export default Students