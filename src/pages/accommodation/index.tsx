import { useState } from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import "./style.scss";

const Accommodation = () => {
  return (
    <div className="page-content">
      <PageHeader title="Accommodation" />
    </div>
  )
}

export default Accommodation