import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
import DelegateWithDrawal from "./delegateWithDrawal";

const Withdrawals = () => {
  return (
    <DelegateWithDrawal/>
  )
}

export default Withdrawals