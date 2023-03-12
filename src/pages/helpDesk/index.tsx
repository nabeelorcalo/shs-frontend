import { useState } from "react";
import { Outlet } from "react-router-dom";
import ActivityLog from "../activityLog/systemAdmin/activityLog";
import "./style.scss";
import HelpDeskSystemAdmin from "./systemAdmin/helpDesk";

const Withdrawals = () => {
  return (
   <div>
    <HelpDeskSystemAdmin/>
   </div>
  )
}

export default Withdrawals