import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
import LeaveRequest from "../../components/LeaveRequest";
import EmojiEvaluation from "../../components/EmojiEvaluation"
import AssesmentModal from "../../components/SignatureAndUploadModal"
import MyProfileDocUpload from "../../components/MyProfileDocUpload";
import CreateFolderModal from "../../components/CreateFolderModal";
import EditGoalTask from "../../components/EditGoalTask";
import AddRequestMessage from "../../components/AddRequestMessage";
import SetaGoal from "../../components/SetaGoal";
import { PopUpModal } from "../../components/Model";

const Calendar = () => {
  const name = "Calvin Grayson"

  return (
    <p>Calendar </p>
  )
}

export default Calendar