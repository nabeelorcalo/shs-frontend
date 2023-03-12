import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
import ActivityLogSystemAdmin from "./systemAdmin/activityLog"

const ActivityLog = () => {
  return (
   <div>
    <ActivityLogSystemAdmin/>
   </div>
  )
}

export default ActivityLog