import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
import LeaveRequest from "../../components/LeaveRequest";
import EmojiEvaluation from "../../components/EmojiEvaluation"
import AssesmentModal from "../../components/AssesmentModal"
import MyProfileDocUpload from "../../components/MyProfileDocUpload";
import CreateFolderModal from "../../components/CreateFolderModal";
import EditGoalTask from "../../components/EditGoalTask";
import AddRequestMessage from "../../components/AddRequestMessage";
import SetaGoal from "../../components/SetaGoal";

const Calendar = () => {
  const name = "Calvin Grayson"
  return (
    <>
      <p>Calendar </p>
      <div className="flex gap-3">
        <LeaveRequest title="Leave Request" />
        <EmojiEvaluation title={`Performance Report - ${name}`} />
        <AssesmentModal title="Signature" />
        <MyProfileDocUpload title="Upload Documents" />
        <CreateFolderModal title="Create New Folder" />
        <EditGoalTask title="Edit Goal Task" />
        <AddRequestMessage  title="Add Request Message" />
        <SetaGoal title="Set a Goal"/>
      </div>
    </>

  )
}

export default Calendar