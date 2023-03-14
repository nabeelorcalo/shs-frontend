import { useState } from "react";
import { Outlet } from "react-router-dom";
import Certificates from "../certificate";
import "./style.scss";

const Dashboard = () => {
  return (
    <Certificates />
  )
}

export default Dashboard