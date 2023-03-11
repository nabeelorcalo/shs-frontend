import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
import HelpDesk from "./systemAdmin/helpDesk";

const Withdrawals = () => {
  return (
   <div>
    <HelpDesk/>
   </div>
  )
}

export default Withdrawals