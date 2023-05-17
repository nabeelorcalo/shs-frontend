import { useState } from "react";
import { Outlet } from "react-router-dom";
import PersonalisationContent from "./PersonalisationContent/PersonalisationContent";
import "./style.scss";

const Personalisation = () => {
  return <PersonalisationContent />;
};

export default Personalisation;
