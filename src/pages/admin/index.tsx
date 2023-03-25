import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminManagement from "./adminMangement";
import "./style.scss";

const Admin = () => {
  return (
    <AdminManagement/>
  )
}

export default Admin