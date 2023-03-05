import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
import LeaveRequest from "../../components/LeaveRequest";
import EmojiEvaluation from "../../components/EmojiEvaluation"
import AssesmentModal from "../../components/AssesmentModal"
import MyProfileDocUpload from "../../components/MyProfileDocUpload";

const Calendar = () => {
  const name = "Calvin Grayson"
  return (
    <div className="flex gap-3">
      <p>Calendar </p>
      <LeaveRequest title="Leave Request" />
      <EmojiEvaluation title={`Performance Report - ${name}`} />
      <AssesmentModal title="Signature"/>
      <MyProfileDocUpload title="Upload Documents"/>
    </div>
  )
}

export default Calendar