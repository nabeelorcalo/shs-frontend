import { useState } from "react";
import { Outlet } from "react-router-dom";
import ContractsStudent from "./contractsStudent";
import "./style.scss";

const Contracts = () => {
  return (
    <div>
      <ContractsStudent />
    </div>
  );
};

export default Contracts;
