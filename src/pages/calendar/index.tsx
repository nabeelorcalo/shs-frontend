import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
import LeaveRequest from "../../components/LeaveRequest";

const Calendar = () => {
  return (
  <>
    <p>Calendar </p>
    <LeaveRequest title="Leave Request"/>
    </>
  )
}

export default Calendar