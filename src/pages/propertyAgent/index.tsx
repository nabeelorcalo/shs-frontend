import { useState } from "react";
import { Outlet } from "react-router-dom";
import PropertyDashboard from "./propertDahboard";
import "./style.scss";

const PropertyAgent = () => {
  return (
   <PropertyDashboard/>
  )
}

export default PropertyAgent